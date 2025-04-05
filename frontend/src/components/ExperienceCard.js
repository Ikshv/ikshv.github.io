import React from 'react';
import './ExperienceCard.css';

function ExperienceCard({ jobTitle, companyName, startDate, endDate, description, projects }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-md hover:shadow-xl transition-all">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white">{jobTitle}</h3>
        <p className="text-sm text-gray-300">{companyName} | {startDate} - {endDate}</p>
        <p className="mt-2 text-gray-300 text-sm">{description}</p>
      </div>

      {projects && projects.map((project, index) => (
        <div key={index} className="mt-4 bg-white/5 p-4 rounded-md border border-white/10">
          <h4 className="text-md font-semibold text-white mb-1">{project.name}</h4>
          <p className="text-sm text-gray-200 mb-2">{project.summary}</p>

          <div className="mb-2">
            <p className="text-xs text-gray-400 font-semibold">Technologies:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-blue-500/20 text-blue-200 px-2 py-1 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <ul className="list-disc list-inside text-sm text-gray-300">
            {project.highlights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ExperienceCard;
