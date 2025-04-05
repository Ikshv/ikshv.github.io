import React from 'react';
import { DiReact, DiNodejs, DiPython, DiJava } from 'react-icons/di';
import { SiTailwindcss, SiMongodb, SiTensorflow } from 'react-icons/si';

function SkillsPreview() {
  const skills = [
    { icon: <DiReact size={28} color="#61DBFB" />, name: 'React' },
    { icon: <DiNodejs size={28} color="#68A063" />, name: 'Node.js' },
    { icon: <DiPython size={28} color="#3776AB" />, name: 'Python' },
    { icon: <DiJava size={28} color="#007396" />, name: 'Java' },
    { icon: <SiTailwindcss size={28} color="#06B6D4" />, name: 'Tailwind' },
    { icon: <SiMongodb size={28} color="#4DB33D" />, name: 'MongoDB' },
    { icon: <SiTensorflow size={28} color="#FF6F00" />, name: 'TensorFlow' }
  ];

  return (
    <section className="py-10 px-6 text-white text-center">
      <h2 className="text-2xl font-semibold mb-4">Core Stack</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur border border-white/20 text-sm"
          >
            {skill.icon}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsPreview;
