import React from 'react';
import './SkillsCard.css';

function SkillsCard({ name, icon }) {
  return (
    <div className="skills-card">
      {icon}
      <span>{name}</span>
    </div>
  );
}

export default SkillsCard;
