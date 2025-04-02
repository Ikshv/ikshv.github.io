import React from 'react';
// import './SkillsCard.css';

function SkillsCard({ name, icon }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/10 border border-white/20 hover:shadow-xl hover:bg-white/20 transition">
      <div className="mb-2 text-3xl">{icon}</div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

export default SkillsCard;
