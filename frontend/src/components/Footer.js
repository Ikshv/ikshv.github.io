import React from 'react';

function Footer() {
    return (
        <footer style={footerStyle}>
            <p>{new Date().getFullYear()} IKS. All rights reserved. </p>
        </footer>
    );
}

const footerStyle = {
    backgroundColor: '#333',
    color: "#999",
    padding: '1rem'
};

export default Footer;