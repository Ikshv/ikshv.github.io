import React from 'react';
import { Link } from 'react-router-dom';

function SiteSidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Overlay (optional, for mobile UX) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white/20 backdrop-blur-md text-white shadow-lg transform transition-transform duration-300 z-[1001] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="text-sm px-4 py-2 bg-gray-800 hover:bg-gray-700 w-full text-left"
        >
          {isOpen ? '✖ Close Sidebar' : '☰ Open Sidebar'}
        </button>

        <nav className="flex flex-col gap-4 mt-4 px-4">
          <Link className="hover:text-blue-300" to="/" onClick={toggleSidebar}>
            Home
          </Link>
          <Link className="hover:text-blue-300" to="/about" onClick={toggleSidebar}>
            About
          </Link>
          <Link className="hover:text-blue-300" to="/projects" onClick={toggleSidebar}>
            Projects
          </Link>
        </nav>
      </div>
    </>
  );
}

export default SiteSidebar;
