import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo512.png';
import Dropdown from './Dropdown';

function Header({ title, subtitle, toggleSidebar }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-[999] w-full bg-white/10 backdrop-blur-md text-white shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-xl p-2 bg-white/20 rounded-md hover:bg-white/30 transition"
          >
            ☰
          </button>

          <img src={logo} alt="Site Logo" className="h-10" />
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {subtitle && <p className="text-sm text-gray-200">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-100">Welcome, {user.email}</span>
              <button
                onClick={logout}
                className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:underline">
                Login
              </Link>
              <Link to="/create" className="text-sm hover:underline">
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="flex justify-center gap-6 py-2 border-t border-white/10 text-sm font-medium">
        <Link className="hover:text-blue-400 transition" to="/">Home</Link>
        <Link className="hover:text-blue-400 transition" to="/projects">Projects</Link>
        <Link className="hover:text-blue-400 transition" to="/skills">Skills</Link>

        <Link className="hover:text-blue-400 transition" to="/about">About</Link>


        <Dropdown
          label="Playground"
          items={[
            { label: 'Webcam Demo', href: '/webcam' },
            { label: 'Data Fetcher', href: '/datafetcher' },
            { label: 'Counter Demo', href: '/counter' }
          ]}
        />
      </nav>
    </header>
  );
}

export default Header;
