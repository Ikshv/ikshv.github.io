import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';

function Sidebar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach((section) => {
        const offset = section.offsetTop - 120;
        const height = section.offsetHeight;
        if (window.scrollY >= offset && window.scrollY < offset + height) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'top', label: 'Back to Top' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' }
  ];

  return (
    <div className="fixed top-1/4 left-4 z-[998] bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg space-y-4 text-sm text-white">
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <HashLink
            key={item.id}
            smooth
            to={`#${item.id}`}
            scroll={el => {
              const yOffset = -100; // Adjust based on your header height
              const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }}
            className={`transition-colors px-3 py-1 rounded hover:bg-blue-500 hover:text-white ${
              activeSection === item.id
                ? 'bg-blue-600 text-white font-bold'
                : 'text-gray-200'
            }`}
          >
            {item.label}
          </HashLink>

        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
