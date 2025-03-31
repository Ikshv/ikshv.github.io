import React from 'react';
import './Contact.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2>Contact Me</h2>
      <p>Have a question, a project idea, or just want to connect?</p>

      <div className="contact-links">
        <a href="mailto:ikshv.dev@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope /> ikshv.dev@gmail.com
        </a>
        <a href="https://github.com/ikshv" target="_blank" rel="noopener noreferrer">
          <FaGithub /> github.com/ikshv
        </a>
        <a href="https://www.linkedin.com/in/isaac-shvartsman" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> linkedin.com/in/isaac-shvartsman
        </a>
      </div>
    </section>
  );
}

export default Contact;
