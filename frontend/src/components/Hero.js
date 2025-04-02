import React from 'react';
import { HashLink } from 'react-router-hash-link';

function Hero() {
  return (
    <section
      className="relative flex items-center justify-center h-screen text-center text-white px-6"
      id="top"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
          Hi, I'm Isaac
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8">
          A full stack developer passionate about building engaging, user-friendly experiences.
        </p>

        <HashLink
          smooth
          to="#projects"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
        >
          View My Work
        </HashLink>
      </div>
    </section>
  );
}

export default Hero;
