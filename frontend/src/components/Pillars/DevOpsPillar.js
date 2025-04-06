import React from 'react';
import { FaGithub, FaDocker } from 'react-icons/fa';
import { SiGithubactions, SiNextdotjs } from 'react-icons/si';
import { Link } from 'react-router-dom';

const DevOpsPillar = () => {
  const devopsProjects = [
    {
      name: 'CI/CD Automation Suite',
      description:
        'Built automated GitHub Actions workflows for building, testing, and deploying multiple projects. Enabled seamless integration pipelines with Docker and Vercel.',
      tags: ['GitHub Actions', 'CI/CD', 'Docker', 'Vercel'],
      icon: <FaGithub />,
      link: '/projects/cicd-suite',
    },
    {
      name: 'System Design Lab',
      description:
        'Designed and documented scalable backend infrastructure for a full-stack analytics dashboard using Next.js, PostgreSQL, and microservices.',
      tags: ['System Architecture', 'Next.js', 'PostgreSQL', 'Containerization'],
      icon: <SiNextdotjs />,
      link: '/projects/system-design',
    },
  ];

  return (
    <section className="py-10 px-6 text-white max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🧱 DevOps & System Design</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {devopsProjects.map((project, index) => (
          <Link
            to={project.link}
            key={index}
            className="block bg-white/10 border border-white/20 p-6 rounded-lg hover:bg-white/20 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-2 text-blue-300">
              {project.icon}
              <h3 className="text-xl font-semibold">{project.name}</h3>
            </div>
            <p className="text-sm text-white/90 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-blue-200">
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

export default DevOpsPillar;
