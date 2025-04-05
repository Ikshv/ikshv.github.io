import React from 'react';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import About from './About';

function AboutPage() {
    return (
        <main className="px-6 py-10 max-w-5xl mx-auto text-white space-y-0">    
          <About />
          <Education />
          <Experience />
          <Skills />
        </main>
      );
    }

export default AboutPage;