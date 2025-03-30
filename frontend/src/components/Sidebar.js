import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import './Sidebar.css'; // make sure you create this file for styling

function Sidebar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach((section) => {
        const offset = section.offsetTop - 120; // adjust buffer
        const height = section.offsetHeight;
        if (window.scrollY >= offset && window.scrollY < offset + height) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial trigger
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage-sidebar">
      <nav>
        <HashLink
          smooth
          to="#top"
          className={activeSection === 'top' ? 'active' : ''}
        >
          Back to the top
        </HashLink>
        <br />
        <HashLink
          smooth
          to="#education"
          className={activeSection === 'education' ? 'active' : ''}
        >
          Education
        </HashLink>
        <br />
        <HashLink
          smooth
          to="#experience"
          className={activeSection === 'experience' ? 'active' : ''}
        >
          Experience
        </HashLink>
        <br />
        <HashLink
          smooth
          to="#skills"
          className={activeSection === 'skills' ? 'active' : ''}
        >
          Skills
        </HashLink>
      </nav>
    </div>
  );
}

export default Sidebar;
