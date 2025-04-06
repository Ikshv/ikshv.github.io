import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projectData.json'; // Assuming you have a JSON file with your project data

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProjects = activeFilter === 'All'
  ? projectsData
  : projectsData.filter(p =>
      Array.isArray(p.tags) && p.tags.includes(activeFilter)
    );

    const searchFilteredProjects = filteredProjects.filter(p =>
    typeof p.title === 'string' && p.title.toLowerCase().includes(search.toLowerCase())
    );


  const uniqueTags = [
    'All',
    ...new Set(projectsData.flatMap(project => project.tags))
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 text-white">
      <h2 className="text-4xl font-bold mb-8 text-center">All Projects</h2>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {uniqueTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${
                activeFilter === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white hover:bg-blue-600/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search projects..."
          className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Project Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {searchFilteredProjects.length > 0 ? (
          searchFilteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">No projects found.</p>
        )}
      </div>
    </section>
  );
}

export default Projects;
