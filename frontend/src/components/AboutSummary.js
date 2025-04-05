import React from 'react';
import { Link } from 'react-router-dom';

function AboutSummary() {
  return (
    <section id="about-preview" className="max-w-4xl mx-auto px-6 py-12 text-white text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
      <p className="text-gray-300 mb-6 leading-relaxed">
        I’m Isaac, a full stack developer with a strong foundation in systems design, machine learning, and automation. I’ve worked on embedded control systems, mining calibration tools, and real-time data pipelines for theft analytics—blending technical depth with clean, user-centric design.
      </p>
      <Link
        to="/about"
        className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-300"
      >
        Read Full Bio →
      </Link>
    </section>
  );
}

export default AboutSummary;
