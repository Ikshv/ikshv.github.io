import React, { useRef, useEffect, useState } from 'react';
import { FaceLandmarker } from '@mediapipe/tasks-vision';
import { Camera } from '@mediapipe/camera_utils';
import { drawLandmarks } from '@mediapipe/drawing_utils';

function FaceLandmarkerComponent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      // Request webcam access
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          // Initialize the FaceLandmarker instance
          const faceLandmarker = new FaceLandmarker({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm/${file}`
          });

          // Set options for face landmarker
          faceLandmarker.setOptions({
            maxNumFaces: 2,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7
          });

          // Define the results handler callback
          faceLandmarker.onResults(onResults);

          // Set up the camera using MediaPipe's Camera utils
          const camera = new Camera(videoRef.current, {
            onFrame: async () => {
              await faceLandmarker.send({ image: videoRef.current });
            },
            width: 640,
            height: 480
          });

          camera.start();
        })
        .catch((err) => {
          console.error('Error accessing webcam:', err);
          if (err.name === 'NotAllowedError') {
            setError('Webcam access denied. Please allow webcam access.');
          } else if (err.name === 'NotFoundError') {
            setError('No webcam found. Ensure that a webcam is connected.');
          } else {
            setError('Unable to access webcam. Please check permissions.');
          }
        });
    }
  }, []);

  // Callback function to process and render the results
  function onResults(results) {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');

    // Set canvas dimensions based on the incoming frame.
    canvasElement.width = results.image.width;
    canvasElement.height = results.image.height;

    // Draw the image from the video frame
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // If face landmarks are detected, draw them
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1 });
      }
    }

    canvasCtx.restore();
  }

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h1>Webcam with Face Landmarks</h1>
      {/* Hidden video element for capturing camera stream */}
      <video ref={videoRef} style={{ display: 'none', transform: 'scaleX(-1)' }} />
      {/* Canvas element to show the processed video with face landmarks */}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', maxWidth: '640px', maxHeight: '480px', transform: 'scaleX(-1)' }} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default FaceLandmarkerComponent;
