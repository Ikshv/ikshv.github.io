import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SiteSidebar.css';

function SiteSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <div className={`site-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      {isOpen && (
        <nav className="sidebar-nav">
          <Link className="sidebar-link" to="/">Home</Link>
          <Link className="sidebar-link" to="/about">About</Link>
          <Link className="sidebar-link" to="/projects">Projects</Link>
        </nav>
      )}
    </div>
  );
}

export default SiteSidebar;
