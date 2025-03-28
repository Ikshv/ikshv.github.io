import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SiteSidebar.css';

function SiteSidebar({ isOpen, toggleSidebar }) {


  return (
    <div className={`site-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      {isOpen && (
        <nav className="sidebar-nav">
          <Link className="sidebar-link" to="/" onClick={toggleSidebar}>Home</Link>
          <Link className="sidebar-link" to="/about" onClick={toggleSidebar}>About</Link>
          <Link className="sidebar-link" to="/projects" onClick={toggleSidebar}>Projects</Link>
        </nav>
      )}
    </div>
  );
}

export default SiteSidebar;
