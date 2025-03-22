import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // adjust path as needed
import './Header.css';

function Header({ title, subtitle }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-top">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {/* Conditional rendering for authentication */}
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
        <Link className="nav-link" to="/nameinput">Name Input</Link>
        <Link className="nav-link" to="/datafetcher">Data Fetcher</Link>
        <Link className="nav-link" to="/togglemessage">Toggle Message</Link>
        <Link className="nav-link" to="/projects">Projects</Link>
        <Link className="nav-link" to="/webcam">WEBCAM</Link>
      </nav>
    </header>
  );
}

export default Header;
