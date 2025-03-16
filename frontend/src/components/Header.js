import React from 'react';
// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import './Header.css'
import Dropdown from './Dropdown';

function Header({ title, subtitle }) {
    return (
        <header className='header'>
            <div className='header-top'>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
                <DarkModeToggle />
                <Dropdown />
            </div>
            <nav className='navbar'>
                <Link className='nav-link' to="/">Home</Link>
                <Link className='nav-link' to="/counter">Counter</Link>
                <a href='#skills'>Skills</a>
                <Link className='nav-link' to="/nameinput">Name Input</Link>
                <Link className='nav-link' to="/datafetcher">Data Fetcher</Link>
                <Link className='nav-link' to="/togglemessage">Toggle Message</Link>
                <Link className='nav-link' to="/projects">Projects</Link>
                <Link className='nav-link' to="/webcam">WEBCAM</Link>
            </nav>
        </header>
    );
}

export default Header;