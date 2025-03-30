import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Hi, I'm Isaac 👋</h1>
        <p>A full stack developer passionate about building engaging, user-friendly experiences.</p>
        <HashLink smooth to="projects" className="hero-btn">
          View My Work
        </HashLink>
      </div>
    </section>
  );
}

export default Hero;
