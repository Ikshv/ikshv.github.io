import React, { useRef, useEffect, useState } from 'react';

function WebcamPage() {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        })
        .catch((err) => {
            console.log("error accessing webcam", err);
            setError("unable to access webcam")
        });
    }, []);

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
        </div>
    );
}



export default WebcamPage;
