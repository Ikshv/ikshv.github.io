import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioProjects } from '../hooks/usePortfolioProjects';

function HighlightsRow() {
  const { rows: highlights, loading, error } = usePortfolioProjects({
    highlightsOnly: true,
    limit: 3,
  });

  return (
    <section className="bg-white/5 backdrop-blur-md py-12 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Featured Projects
        </h2>

        {loading && (
          <p className="text-center text-gray-400">Loading featured projects…</p>
        )}
        {!loading && error && (
          <p className="text-center text-red-300 text-sm max-w-lg mx-auto">
            Could not load projects ({error}). Apply the Supabase migration in{' '}
            <code className="text-gray-200">supabase/migrations/</code> and refresh.
          </p>
        )}
        {!loading && !error && highlights.length === 0 && (
          <p className="text-center text-gray-400">
            No featured projects yet. Sign in → Dashboard → mark projects as Featured, or run GitHub
            sync.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 border border-white/20 rounded-xl p-5 hover:bg-white/20 transition shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-white/80 mb-4">
                {project.description ||
                  'A modern application built with attention to scalability and performance.'}
              </p>

              <div className="flex flex-wrap gap-2 text-xs text-white/70 mb-4">
                {(project.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-600/20 px-2 py-1 rounded-full border border-blue-500/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm">
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  GitHub
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HighlightsRow;
