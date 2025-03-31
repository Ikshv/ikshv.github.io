import React from 'react';
import './About.css';
import Repos from './Repos';

function About() {
  return (
    <section id="about" className="about-section">
        <Repos />
      <h2>About Me</h2>
      <p>
        Hey! I’m Isaac, a full stack developer with a strong background in engineering and data analysis.
        I’ve worked on embedded control systems, mining calibration tools, and data pipelines for real-time theft analytics.
        My strength lies in combining functionality with clean, user-focused design.
      </p>
      <p>
        I’m passionate about building systems that are scalable, intuitive, and genuinely helpful.
        Whether it’s automating calibration workflows or building dynamic frontends with React, I love making tech approachable and effective.
      </p>
      <p>
        Outside of code, you might find me digging into music production 🎶, remixing tracks into tech house, or exploring game development tools. I’m always learning, always experimenting.
      </p>
    </section>
  );
}

export default About;
