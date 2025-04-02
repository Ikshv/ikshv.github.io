import React from 'react';
import SkillsCard from './SkillsCard';

function SkillCategory({ title, skills }) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-6">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillsCard key={index} {...skill} />
          ))}
        </div>
      </div>
    );
  }

  export default SkillCategory;