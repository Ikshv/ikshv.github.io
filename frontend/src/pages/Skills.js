import React from 'react';
// import './Skills.css';
import { 
  DiJavascript1, DiReact, DiCss3, DiHtml5, DiNodejs, DiJava, 
  DiRuby
} from 'react-icons/di';
import { 
  SiRedux, SiExpress, SiMongodb, SiPython, SiPostgresql, 
  SiFlask, SiSqlite, SiTensorflow, SiTailwindcss,
  SiMysql,
  SiGit,
  SiGithub
} from 'react-icons/si';
import SkillCategory from '../components/SkillCategory';

// Languages skills array
const languagesSkills = [
    {
        name: 'JavaScript',
        icon: <DiJavascript1 size={32} color="#F0DB4F" />
    },
    {
        name: 'Python',
        icon: <SiPython size={32} color="#3776AB" />
    },
    {
        name: 'Ruby',
        icon: <DiRuby size={32} color="#CC342D" />
    }
];

// Frontend skills array
const frontendSkills = [
    {
        name: 'React',
        icon: <DiReact size={32} color="#61DBFB" />
    },
    {
        name: 'Redux',
        icon: <SiRedux size={32} color="#764ABC" />
    }
];

// Backend skills array
const backendSkills = [
    {
        name: 'Node.js',
        icon: <DiNodejs size={32} color="#68A063" />
    },
    {
        name: 'Express',
        icon: <SiExpress size={32} color="#000000" />
    },
    {
        name: 'Flask',
        icon: <SiFlask size={32} color="#000000" />
    }
];

// Databases skills array
const databasesSkills = [
    {
        name: 'MongoDB',
        icon: <SiMongodb size={32} color="#4DB33D" />
    },
    {
        name: 'PostgreSQL',
        icon: <SiPostgresql size={32} color="#336791" />
    },
    {
        name: 'MySQL',
        icon: <SiMysql size={32} color="#4479A1" />
    },
    {
        name: 'SQLite',
        icon: <SiSqlite size={32} color="#003B57" />
    }
];

const stylingTools = [
    {
      name: 'CSS3',
      icon: <DiCss3 size={32} color="#264de4" />
    },  
    {
        name: 'Tailwind CSS',
        icon: <SiTailwindcss size={32} color="#06B6D4" />
    }
];

const developerTools = [
    {
        name: 'Git',
        icon: <SiGit size={32} color="#F05032" />
    },
    {
        name: 'GitHub',
        icon: <SiGithub size={32} color="#181717" />
    },
    {
      name: 'TensorFlow',
      icon: <SiTensorflow size={32} color="#FF6F00" />
  }
];

function Skills() {
    return (
      <section
        id="skills"
        className="max-w-5xl mx-auto px-6 py-12 text-white text-center"
      >
        <h2 className="text-4xl font-bold mb-12">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start border border-white/30 p-6 rounded-lg bg-white/10 backdrop-blur-md">
          <SkillCategory title="Languages" skills={languagesSkills} />
          <SkillCategory title="Frontend Libraries / Frameworks" skills={frontendSkills} />
          <SkillCategory title="Styling Tools / UI Framework" skills={stylingTools} />
          <SkillCategory title="Backend/Server" skills={backendSkills} />
          <SkillCategory title="Databases" skills={databasesSkills} />
          <SkillCategory title="Developer Tools / Libraries" skills={developerTools} />
        </div>
      </section>
    );
  }
  

export default Skills;
