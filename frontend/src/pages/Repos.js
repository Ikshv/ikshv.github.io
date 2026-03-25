import React from 'react';
import { usePortfolioProjects } from '../hooks/usePortfolioProjects';

function Repos() {
  const { rows: projectData, loading, error } = usePortfolioProjects({
    includeDrafts: false,
    highlightsOnly: false,
  });

  return (
    <div className="container mx-auto bg-white/20 p-6 rounded-xl shadow-lg backdrop-blur text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Repositories</h1>

      {loading && <p className="text-center text-gray-300">Loading…</p>}
      {error && (
        <p className="text-center text-red-300 text-sm mb-4">{error}</p>
      )}

      {!loading && projectData.length === 0 ? (
        <p className="text-center text-gray-300">No projects on the site yet.</p>
      ) : (
        <ul className="space-y-6">
          {projectData.map((project) => (
            <li
              key={project.id}
              className="border border-white/30 p-4 rounded-md bg-white/10 hover:bg-white/20 transition"
            >
              <h3 className="text-2xl font-semibold text-blue-200">{project.title}</h3>
              <p className="text-gray-100 mt-2">{project.description}</p>

              <div className="mt-3 space-x-4">
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-300 hover:text-green-400 underline"
                  >
                    🌐 Live Demo
                  </a>
                )}
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-300 hover:text-blue-400 underline"
                >
                  📦 GitHub
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Repos;
