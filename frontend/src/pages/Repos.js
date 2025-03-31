import React from 'react';
import projectData from '../data/projectIndex.json';
// import './Repos.css'; // optional if you want to style it

function Repos() {
  return (
    <div className="repos">
      <h1>Repositories</h1>
      {projectData.length === 0 ? (
        <p>No live projects found.</p>
      ) : (
        <ul>
          {projectData.map((project, index) => (
            <li key={index}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              {project.homepage && (
                <a href={project.homepage} target="_blank" rel="noreferrer">Live Demo</a>
              )}
              <a href={`https://github.com/ikshv/${project.name}`} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Repos;
