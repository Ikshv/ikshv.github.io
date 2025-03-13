import React, { useState } from 'react';

function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.body.style.backgroundColor = newMode ? '#333' : '#fff';
            document.body.style.color = newMode ? '#fff' : '#333';
            return newMode;
        });
    };

    return (
        <button onClick={toggleDarkMode} style={toggleStyle}>
            Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
    );
}

const toggleStyle = {
    margin: '1rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer'
}

export default DarkModeToggle;