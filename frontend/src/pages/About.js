import React from 'react';

function About() {
  return (
    <section
      id="about"
      className="container mx-auto bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-white space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold mb-4 border-b border-white/30 pb-2">About Me</h2>

        <p className="text-lg text-gray-100 leading-relaxed">
          Hey! I’m Isaac, a full stack developer with a strong background in engineering and data analysis.
          I’ve worked on embedded control systems, mining calibration tools, and data pipelines for real-time theft analytics.
          My strength lies in combining functionality with clean, user-focused design.
        </p>

        <p className="text-lg text-gray-100 leading-relaxed">
          I’m passionate about building systems that are scalable, intuitive, and genuinely helpful.
          Whether it’s automating calibration workflows or building dynamic frontends with React, I love making tech approachable and effective.
        </p>

        <p className="text-lg text-gray-100 leading-relaxed">
          Outside of code, you might find me digging into music production 🎶, remixing tracks into tech house, or exploring game development tools. I’m always learning, always experimenting.
        </p>
      </div>
    </section>
  );
}

export default About;
