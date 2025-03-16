import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>I'm Isaac</h1>
        <p>A full stack developer passionate about building engaging, user-friendly experiences.</p>
        <a href="/projects" className="hero-btn">View My Work</a>
        {/* Optionally add social icons or a scroll indicator here */}
      </div>
    </section>
  );
}

export default Hero;
