import React from 'react';

function ProjectCard({ title, description, imageUrl, projectUrl, tags = [] }) {
  return (
    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-5 flex flex-col">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-4 border border-white/20"
        />
      )}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-300 mb-4 line-clamp-3">{description}</p>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {projectUrl && (
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-400 hover:underline mt-auto"
        >
          View Project →
        </a>
      )}
    </div>
  );
}

export default ProjectCard;
