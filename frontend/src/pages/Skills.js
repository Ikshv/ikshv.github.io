import React from 'react';
import {
  DiJavascript1, DiReact, DiCss3, DiHtml5, DiNodejs, DiJava
} from 'react-icons/di';
import {
  SiRedux, SiExpress, SiMongodb, SiPython, SiPostgresql,
  SiFlask, SiSqlite, SiTensorflow, SiTailwindcss, SiMysql,
  SiGit, SiGithub
} from 'react-icons/si';

const skills = {
  Languages: [
    { icon: <DiJavascript1 color="#f7df1e" />, name: 'JavaScript' },
    { icon: <SiPython color="#3572A5" />, name: 'Python' },
    { icon: <DiJava color="#b07219" />, name: 'Java' }
  ],
  Frontend: [
    { icon: <DiReact color="#61dafb" />, name: 'React' },
    { icon: <SiRedux color="#764abc" />, name: 'Redux' },
    { icon: <DiHtml5 color="#e34c26" />, name: 'HTML5' },
    { icon: <DiCss3 color="#264de4" />, name: 'CSS3' },
    { icon: <SiTailwindcss color="#38bdf8" />, name: 'Tailwind CSS' }
  ],
  Backend: [
    { icon: <DiNodejs color="#3c873a" />, name: 'Node.js' },
    { icon: <SiExpress color="#ffffff" />, name: 'Express' },
    { icon: <SiFlask color="#000000" />, name: 'Flask' }
  ],
  Databases: [
    { icon: <SiMongodb color="#4DB33D" />, name: 'MongoDB' },
    { icon: <SiPostgresql color="#336791" />, name: 'PostgreSQL' },
    { icon: <SiMysql color="#00758F" />, name: 'MySQL' },
    { icon: <SiSqlite color="#003B57" />, name: 'SQLite' }
  ],
  Tools: [
    { icon: <SiGit color="#F05032" />, name: 'Git' },
    { icon: <SiGithub color="#ffffff" />, name: 'GitHub' },
    { icon: <SiTensorflow color="#FF6F00" />, name: 'TensorFlow' }
  ]
};

function Skills() {
  return (
    <section className="text-white max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
      <div className="space-y-8">
        {Object.entries(skills).map(([category, items], idx) => (
          <div key={idx}>
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <div className="flex flex-wrap gap-4">
              {items.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur rounded-md border border-white/20 text-sm"
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
