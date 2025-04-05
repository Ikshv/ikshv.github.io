import React from 'react';
import { FaCode, FaTools, FaMusic } from 'react-icons/fa';
import { MdArchitecture, MdDevicesOther } from 'react-icons/md';

function About() {
  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 py-4 text-white space-y-10"
    >
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">About Me</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Full Stack Developer. Systems Thinker. Builder of elegant and impactful solutions.
        </p>
      </div>

      {/* Background Summary */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md space-y-4 text-gray-100">
        <p>
          I'm Isaac — a full stack developer with deep experience across software, hardware integration, and system architecture.
          From embedded control systems and CI pipelines to full-stack web apps, I bridge technical depth with intuitive user design.
        </p>
        <p>
          Whether I'm automating mining equipment calibration or crafting React-based dashboards, I focus on scalable, clean, and future-proof code.
        </p>
      </div>

      {/* What I Do / Strengths */}
      <div className="grid sm:grid-cols-2 gap-6">
        {[
          {
            icon: <FaCode className="text-2xl text-blue-400" />,
            title: 'Full Stack Development',
            desc: 'React, Node.js, and REST APIs with clean, testable code and scalable architecture.',
          },
          {
            icon: <MdArchitecture className="text-2xl text-purple-400" />,
            title: 'System Design & Automation',
            desc: 'Experience building CI/CD pipelines, DevOps flows, and integrated system tooling.',
          },
          {
            icon: <MdDevicesOther className="text-2xl text-green-400" />,
            title: 'Hardware & Embedded',
            desc: 'Engineering control systems for industrial and military hardware with data validation.',
          },
          {
            icon: <FaTools className="text-2xl text-yellow-400" />,
            title: 'AI & Tooling',
            desc: 'Working with ML models and tooling in TensorFlow, scikit-learn, and AI-enabled systems.',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3 mb-2">
              {item.icon}
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
