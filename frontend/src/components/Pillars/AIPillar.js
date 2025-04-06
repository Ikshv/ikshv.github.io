import React from 'react';
import { FaBrain } from 'react-icons/fa';
import { SiPython, SiTensorflow, SiScikitlearn } from 'react-icons/si';
import { Link } from 'react-router-dom';

const AiMlPillar = () => {
  const projects = [
    {
      name: 'Android Vulnerability Classifier',
      description:
        'Used Random Forests to analyze APK features and detect potential vulnerabilities in Android applications. Integrated with QARK and DroidDetective.',
      tags: ['Python', 'Random Forest', 'APK Analysis', 'Security'],
      icon: <SiPython />,
      link: '/projects/android-ml',
    },
    {
      name: 'Image Recognition Pipeline',
      description:
        'Developed a CNN model in TensorFlow for classifying red shrimp by size and age in aquarium tanks. Trained on labeled datasets with real-time webcam input.',
      tags: ['TensorFlow', 'CNN', 'Computer Vision', 'Shrimp Classification'],
      icon: <SiTensorflow />,
      link: '/projects/shrimp-vision',
    },
    {
      name: 'NLP Resume Extractor',
      description:
        'Built an NLP system using spaCy and Scikit-learn to extract structured fields from unstructured resumes (name, skills, experience, etc).',
      tags: ['NLP', 'spaCy', 'Scikit-learn'],
      icon: <SiScikitlearn />,
      link: '/projects/resume-nlp',
    },
  ];

  return (
    <section className="py-10 px-6 text-white max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🧠 AI & Machine Learning</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Link
            to={project.link}
            key={index}
            className="block bg-white/10 border border-white/20 p-6 rounded-lg hover:bg-white/20 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-2 text-yellow-300">
              {project.icon}
              <h3 className="text-xl font-semibold">{project.name}</h3>
            </div>
            <p className="text-sm text-white/90 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-yellow-200">
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

export default AiMlPillar;
