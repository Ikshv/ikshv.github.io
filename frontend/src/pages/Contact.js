import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <section
      id="contact"
      className="max-w-3xl mx-auto px-6 py-10 text-white text-center"
    >
      <h2 className="text-4xl font-bold mb-6">Let’s Connect</h2>
      <p className="text-lg mb-10 text-gray-300">
        Got a question, a collaboration idea, or just want to say hey? Reach out.
      </p>

      <div className="grid sm:grid-cols-3 gap-6">
        <a
          href="mailto:ikshvartsman@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-5 hover:bg-white/20 transition"
        >
          <FaEnvelope className="text-3xl mb-2 text-blue-300" />
          <span className="text-sm">ikshvartsman@gmail.com</span>
        </a>

        <a
          href="https://github.com/ikshv"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-5 hover:bg-white/20 transition"
        >
          <FaGithub className="text-3xl mb-2 text-gray-300" />
          <span className="text-sm">github.com/ikshv</span>
        </a>

        <a
          href="https://www.linkedin.com/in/isaac-shvartsman"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-5 hover:bg-white/20 transition"
        >
          <FaLinkedin className="text-3xl mb-2 text-blue-400" />
          <span className="text-sm">linkedin.com/in/isaac-shvartsman</span>
        </a>
      </div>
    </section>
  );
}

export default Contact;
