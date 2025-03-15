// import React, { useRef, useEffect, useState } from 'react';

// function WebcamPage() {
//     const videoRef = useRef(null);
//     const socketRef = useRef(null);
//     const mediaRecorderRef = useRef(null);
//     const [stream, setStream] = useState(null);
//     const [error, setError] = useState(null);
//     const [isSending, setIsSending] = useState(true);

//     useEffect(() => {
//         // initialize WebSocket connection to node server
//         socketRef.current = new WebSocket('ws://localhost:8080/ws');

//         socketRef.current.onopen = () => {
//             console.log('WebSocket connected');
//         };

//         socketRef.current.onerror = (err) => {
//             console.error('WebSocket error:', err);
//         };


//         // request webcam access
//         navigator.mediaDevices.getUserMedia({ video: true })
//         .then((mediaStream) => {
//             setStream(mediaStream)
//             if (videoRef.current) {
//                 videoRef.current.srcObject = mediaStream;
//             }

//             // create a mediarecorder to capture stream chunks
//             const options = { mimeType: 'video/webm; codecs=vp9' };
//             const recorder = new MediaRecorder(mediaStream, options);
//             mediaRecorderRef.current = recorder;

//             // when data is available, send it over websocket
//             recorder.ondataavailable = (event) => {
//                 if (event.data && event.data.size > 0 && socketRef.current.readyState === WebSocket.OPEN) {
//                     socketRef.current.send(event.data);
//                 }
//             };

//             // start recording with a timeslice (e.g., 1000 ms)
//             recorder.start(1000)
//         })
//         .catch((err) => {
//             console.log("error accessing webcam", error);
//             setError("unable to access webcam")
//         });

//         // cleanup on component unmount
//         return () => {
//             if (mediaRecorderRef.current) {
//                 mediaRecorderRef.current.stop();
//             }
//             if (stream) {
//                 stream.getTracks().forEach(track => track.stop());
//             }
//             if (socketRef.current) {
//                 socketRef.current.close();
//             }
//         };
//     }, []);

//     // toggle fuinction to pause/resume sending of stream chunks
//     const toggleStreaming = () => {
//         if (mediaRecorderRef.current) {
//             if (isSending) {
//                 mediaRecorderRef.current.pause()
//                 setIsSending(false);
//             } else {
//                 mediaRecorderRef.current.resume();
//                 setIsSending(true);
//             }
//         }
//     };

//     return (
//         <div style={{ textAlign: 'center', padding: '2rem' }}>
//             <video 
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 style={{
//                      width: '100%', 
//                      maxWidth: '600px', 
//                      border: '2px solid #333', 
//                      borderRadius: '8px',
//                      transform: 'scaleX(-1)'
//                 }}
//             /> 
//             <br />
//             <button onClick={toggleStreaming} style={{ marginTop: '1rem'}}>
//                 {isSending ? 'stop sending' : 'start sending'}
//             </button>
//         </div>
//     );
// }



// export default WebcamPage;

// src/pages/WebcamLandmarks.js
import React, { useRef, useEffect, useState } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

function WebcamLandmarks() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [camera, setCamera] = useState(null);
  const [hands, setHands] = useState(null);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      // Create a new Hands instance with the helper to load the model files.
      const handsInstance = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      handsInstance.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
      });

      // Define the callback that receives the results from MediaPipe.
      handsInstance.onResults(onResults);

      setHands(handsInstance);
    }
  }, []);

    // Set up the camera using MediaPipe's Camera utils.
    const startCamera = () => {
        const cameraInstance = new Camera(videoRef.current, {
            onFrame: async () => {
                await hands.send({ image: videoRef.current });
            },
            width: 640,
            height: 480
            });
            cameraInstance.start();
            setCamera(cameraInstance)
            setCameraActive(true)         
    };

    const stopCamera = () => {
        if (camera) {
            camera.stop();
            setCameraActive(false);
        }
    };


  function onResults(results) {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');

    // Set canvas dimensions based on the incoming frame.
    canvasElement.width = results.image.width;
    canvasElement.height = results.image.height;

    // Draw the image from the video frame.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // If hands are detected, draw landmarks and connectors.
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, Hands.HAND_CONNECTIONS, { color: 'green', lineWidth: 1 });
        drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1 });
      }
    }
    canvasCtx.restore();
  }

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h1>Webcam with Landmarks</h1>
      {/* Hidden video element for capturing camera stream */}
      <video ref={videoRef} style={{ display: 'none' }} />
      {/* Canvas element to show the processed video with overlays */}
      <canvas ref={canvasRef} style={{ width: '640px', height: '480px', transform: 'scaleX(-1)'}} />

      <button onClick={() => (cameraActive ? stopCamera() : startCamera())}>
        {cameraActive ? 'Stop Camera' : 'Start Camera'}
      </button>
    </div>
  );
}

export default WebcamLandmarks;
