import React, { useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { usePortfolioProjects } from '../hooks/usePortfolioProjects';

function rowToCardProps(project) {
  return {
    title: project.title,
    description: project.description,
    tags: project.tags || [],
    projectUrl: project.homepage || project.github_url,
  };
}

function Projects() {
  const { rows: projectsData, loading, error } = usePortfolioProjects({
    includeDrafts: false,
    highlightsOnly: false,
  });
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const uniqueTags = useMemo(() => {
    const tags = projectsData.flatMap((p) => (Array.isArray(p.tags) ? p.tags : []));
    return ['All', ...new Set(tags)];
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    let list =
      activeFilter === 'All'
        ? projectsData
        : projectsData.filter(
            (p) => Array.isArray(p.tags) && p.tags.includes(activeFilter)
          );

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const title = (p.title || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }
    return list;
  }, [projectsData, activeFilter, search]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 text-white">
      <h2 className="text-4xl font-bold mb-8 text-center">All Projects</h2>

      {loading && (
        <p className="text-center text-gray-400 mb-6">Loading projects...</p>
      )}
      {error && (
        <p className="text-center text-red-300 text-sm mb-6 max-w-xl mx-auto">
          {error}. Run the portfolio SQL migration in Supabase if you have not yet.
        </p>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {uniqueTags.map((tag, idx) => (
            <button
              key={idx}
              type="button"
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading && filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...rowToCardProps(project)} />
          ))
        ) : !loading ? (
          <p className="text-center col-span-full text-gray-400">No projects found.</p>
        ) : null}
      </div>
    </section>
  );
}

export default Projects;
