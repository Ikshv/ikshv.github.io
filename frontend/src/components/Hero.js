import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion';
import { BsChevronDown } from 'react-icons/bs';

function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-center justify-center h-screen text-center text-white px-6"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
        >
          Building Intelligent, Scalable Systems.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-200 mb-8"
        >
          I’m a full stack developer and systems architect focused on robust design, machine learning, and seamless user experiences.
        </motion.p>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.5 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid sm:grid-cols-3 gap-4 text-sm mb-10"
        >
          {[
            ['AI & Machine Learning', 'Model Deployment', 'Python, TensorFlow'],
            ['Full Stack Engineering', 'React, Node.js', 'Next.js, Tailwind CSS'],
            ['System Design & DevOps', 'CI/CD, GitHub Actions', 'Docker, Git'],
          ].map((group, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white/10 backdrop-blur p-4 rounded-lg border border-white/20 hover:bg-white/20 transition"
            >
              <p className="font-semibold mb-1 text-white">{group[0]}</p>
              <p className="text-white/80">{group[1]}</p>
              <p className="text-white/60 text-xs">{group[2]}</p>
            </motion.div>
          ))}
        </motion.div>


        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <HashLink
            smooth
            to="#projects"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
          >
            Explore My Work
          </HashLink>
        </motion.div>
      </div>

      {/* Scroll Down */}
      <HashLink
        smooth
        to="#highlights" // change this to the ID of the next section
        scroll={(el) => {
          const yOffset = -100; // adjust for sticky header height
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-[10vh] left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce text-sm flex items-center gap-1 cursor-pointer"
        >
          <BsChevronDown size={30} />
        </motion.div>
      </HashLink>
    </section>
  );
}

export default Hero;
