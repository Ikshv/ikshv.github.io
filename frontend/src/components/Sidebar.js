import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';

function Sidebar() {
  const [activeSection, setActiveSection] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
  
      // Automatically open when scrolled down past Hero
      if (window.scrollY > 300) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  const navItems = [
    { id: 'top', label: 'Top' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'aboutsummary', label: 'About Me' },
    { id: 'skillspreview', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];
  
  
  return (
    <div
      className={`fixed top-1/4 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-[85%]'
      }`}
    >
      {/* Sidebar Content */}
      <div className="relative bg-white/10 backdrop-blur-md p-4 pr-6 rounded-r-xl shadow-lg text-sm text-white w-30">
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <HashLink
              key={item.id}
              smooth
              to={`#${item.id}`}
              scroll={(el) => {
                const yOffset = -100;
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

        {/* Toggle Tab */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-1/2 -right-3 translate-y-[-50%] w-3 h-16 bg-blue-600 hover:bg-blue-500 rounded-r cursor-pointer"
          title={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
        ></div>
      </div>
    </div>
  );
}

export default Sidebar;
