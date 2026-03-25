import React from 'react';
import { FaLaptopCode, FaReact, FaDatabase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FullStackPillar = () => {
  const projects = [
    {
      name: 'CoolShrimps E-Commerce',
      description:
        'A fully responsive storefront built with React, Node.js, and MongoDB. Includes dynamic cart, payment integration, and an admin dashboard.',
      tags: ['React', 'Express', 'MongoDB', 'Tailwind'],
      icon: <FaReact />,
      link: '/projects/coolshrimps-store',
    },
    {
      name: 'Portfolio CMS Dashboard',
      description:
        'A personal content management system for managing portfolio content. Includes authentication, markdown editor, and image uploads.',
      tags: ['Full Stack', 'REST API', 'Tailwind', 'JWT'],
      icon: <FaDatabase />,
      link: '/projects/portfolio-cms',
    },
  ];

  return (
    <section className="py-10 px-6 text-white max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FaLaptopCode className="text-green-300 shrink-0" aria-hidden />
        <span>Full Stack Engineering</span>
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Link
            to={project.link}
            key={index}
            className="block bg-white/10 border border-white/20 p-6 rounded-lg hover:bg-white/20 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-2 text-green-300">
              {project.icon}
              <h3 className="text-xl font-semibold">{project.name}</h3>
            </div>
            <p className="text-sm text-white/90 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-green-200">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-white/10 border border-white/20 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FullStackPillar;
