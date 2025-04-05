import React from 'react';
import { FaUniversity } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Education() {
  const schools = [
    {
      name: 'University of California, Irvine',
      degree: 'Master of Science in Computer Science',
      graduation: 'May 2024',
      coursework: 'Statistical NLP, Distributed Systems & Transactional Systems, Image Recognition',
    },
    {
      name: 'University of California, Riverside',
      degree: 'Bachelor of Arts in Economics / Law & Society',
      graduation: 'June 2020',
      coursework: 'Econometrics, Industrial Organization, Law & Society, Business Law',
    },
  ];

  return (
    <div className="flex flex-col items-center px-6 py-8 max-w-4xl mx-auto">
      {/* Animated Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-10"
      >
        Education
      </motion.h2>

      {/* Education Cards */}
      {schools.map((school, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          className="w-full mb-6 p-6 rounded-xl bg-white/15 backdrop-blur border border-white/30 shadow-lg text-white hover:-translate-y-1 hover:shadow-2xl transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="text-blue-400 mt-1">
              <FaUniversity size={28} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">{school.name}</h3>
              <p className="text-sm text-gray-200">{school.degree}</p>
              <p className="text-sm text-gray-400">Graduated: {school.graduation}</p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.3 + 0.2 }}
                className="text-sm text-gray-400 mt-1"
              >
                <span className="font-medium text-gray-300">Relevant Coursework:</span> {school.coursework}
              </motion.p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Education;
