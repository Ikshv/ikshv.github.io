import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dropdown({ label, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer hover:text-blue-400"
      >
        {label}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white/10 backdrop-blur text-sm text-white p-2 rounded shadow z-50 space-y-1">
          {items.map((item, idx) => (
            <Link
              key={idx}
              to={item.href}
              className="block hover:text-blue-300"
              onClick={() => setIsOpen(false)} // close on click
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
