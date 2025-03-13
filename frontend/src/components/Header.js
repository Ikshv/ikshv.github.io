import React from 'react';
// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Header({ title, subtitle }) {
    return (
        <header style={headerStyle}>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
            {/* <Router> */}
                <nav style={navStyle}>
                    <Link style={linkStyle} to="/">Home</Link>
                    <Link style={linkStyle} to="/counter">Counter</Link>
                    <Link style={linkStyle} to="/nameinput">Name Input</Link>
                    <Link style={linkStyle} to="/datafetcher">Data Fetcher</Link>
                    <Link style={linkStyle} to="/togglemessage">Toggle Message</Link>
                </nav>
            {/* </Router> */}
        </header>
    );
}

const headerStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '1rem',
    textAlign: 'center'
};

const navStyle = {
    padding: '1rem',
};

const linkStyle = {
    margin: '0 10px'
}

export default Header;