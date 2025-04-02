import React from 'react';
import SkillsCard from './SkillsCard';

function SkillCategory({ title, skills }) {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold mb-6">{title}</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="w-32">
            <SkillsCard {...skill} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillCategory;
