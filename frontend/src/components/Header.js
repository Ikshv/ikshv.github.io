import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';
import SiteSidebar from './SiteSidebar';

function Header({ title, subtitle, toggleSidebar }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="site-header">
      <div className="header-top">
        <button onClick={toggleSidebar}>☰</button>
        <h1 className='header-title'>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {user ? (
          <>
            <span className="nav-text">Welcome, {user.email}</span>
            <button className="nav-link logout-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/create">Create an account</Link>
          </>
        )}
      </div>

      <nav className="navbar">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/counter">Counter</Link>
        <a className="nav-link" href="#skills">Skills</a>
        <Link className="nav-link" to="/projects">Projects</Link>

        <div className="dropdown">
          <span className="nav-link dropdown-toggle">More</span>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/togglemessage">Toggle Message</Link></li>
            <li><Link className="dropdown-item" to="/nameinput">Name Input</Link></li>
            <li><Link className="dropdown-item" to="/webcam">WEBCAM</Link></li>
            <li><Link className="dropdown-item" to="/datafetcher">Data Fetcher</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}


export default Header;
