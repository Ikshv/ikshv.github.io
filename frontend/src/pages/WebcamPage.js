import React, { useRef, useEffect, useState } from 'react';

function WebcamPage() {
    const videoRef = useRef(null);
    const socketRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [isSending, setIsSending] = useState(true);

    useEffect(() => {
        // initialize WebSocket connection to node server
        socketRef.current = new WebSocket('ws://localhost:8080/ws');

        socketRef.current.onopen = () => {
            console.log('WebSocket connected');
        };

        socketRef.current.onerror = (err) => {
            console.error('WebSocket error:', err);
        };


        // request webcam access
        navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
            setStream(mediaStream)
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }

            // create a mediarecorder to capture stream chunks
            const options = { mimeType: 'video/webm; codecs=vp9' };
            const recorder = new MediaRecorder(mediaStream, options);
            mediaRecorderRef.current = recorder;

            // when data is available, send it over websocket
            recorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0 && socketRef.current.readyState === WebSocket.OPEN) {
                    socketRef.current.send(event.data);
                }
            };

            // start recording with a timeslice (e.g., 1000 ms)
            recorder.start(1000)
        })
        .catch((err) => {
            console.log("error accessing webcam", error);
            setError("unable to access webcam")
        });

        // cleanup on component unmount
        return () => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    // toggle fuinction to pause/resume sending of stream chunks
    const toggleStreaming = () => {
        if (mediaRecorderRef.current) {
            if (isSending) {
                mediaRecorderRef.current.pause()
                setIsSending(false);
            } else {
                mediaRecorderRef.current.resume();
                setIsSending(true);
            }
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <video 
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                     width: '100%', 
                     maxWidth: '600px', 
                     border: '2px solid #333', 
                     borderRadius: '8px',
                     transform: 'scaleX(-1)'
                }}
            /> 
            <br />
            <button onClick={toggleStreaming} style={{ marginTop: '1rem'}}>
                {isSending ? 'stop sending' : 'start sending'}
            </button>
        </div>
    );
}



export default WebcamPage;
