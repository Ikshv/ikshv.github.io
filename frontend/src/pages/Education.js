import React from 'react';
// import './Education.css';


function Education() {
  return (
  <div className="flex flex-col items-center px-8 py-16 max-w-4xl mx-auto">
    <h2 className="text-4xl text-white mb-8">Education</h2>

    <div className="w-full mb-8 p-8 rounded-xl bg-white/15 backdrop-blur border border-white/20 shadow-lg text-neutral-100 hover:translate-y-[-5px] hover:shadow-2xl transition-all">
      <h3 className="text-xl text-white mb-2">University of California, Irvine</h3>
      <p className="text-sm text-gray-200">Masters of Science in Computer Science</p>
      <p className="text-sm text-gray-300">Graduated: May 2024</p>
      <p className="text-sm text-gray-300">Relevant Coursework: Data Structures, Algorithms, Web Development</p>
    </div>

    <div className="w-full mb-8 p-8 rounded-xl bg-white/15 backdrop-blur border border-white/20 shadow-lg text-neutral-100 hover:translate-y-[-5px] hover:shadow-2xl transition-all">
      <h3 className="text-xl text-white mb-2">University of California, Riverside</h3>
      <p className="text-sm text-gray-200">Bachelor of Arts in Economics / Law & Society</p>
      <p className="text-sm text-gray-300">Graduated: June 2020</p>
      <p className="text-sm text-gray-300">Relevant Coursework: Business Law, Economics, Sociology</p>
    </div>
  </div>

  );
}
export default Education;