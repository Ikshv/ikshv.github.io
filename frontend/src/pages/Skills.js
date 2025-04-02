import React from 'react';
// import './Skills.css';
import { 
  DiJavascript1, DiReact, DiCss3, DiHtml5, DiNodejs, DiJava 
} from 'react-icons/di';
import { 
  SiRedux, SiExpress, SiMongodb, SiPython, SiPostgresql, 
  SiFlask, SiSqlite, SiTensorflow 
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
        name: 'Java',
        icon: <DiJava size={32} color="#007396" />
    }
];

// Frontend skills array
const frontendSkills = [
    {
        name: 'React',
        icon: <DiReact size={32} color="#61DBFB" />
    },
    {
        name: 'CSS',
        icon: <DiCss3 size={32} color="#264de4" />
    },
    {
        name: 'HTML',
        icon: <DiHtml5 size={32} color="#e34c26" />
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
        name: 'SQLite',
        icon: <SiSqlite size={32} color="#003B57" />
    }
];

// Libraries & Tools skills array
const toolsSkills = [
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
        <div className="space-y-12 border border-white/30 p-6 rounded-lg bg-white/10 backdrop-blur-md">
          <SkillCategory title="Languages" skills={languagesSkills} />
          <SkillCategory title="Frontend" skills={frontendSkills} />
          <SkillCategory title="Backend" skills={backendSkills} />
          <SkillCategory title="Databases" skills={databasesSkills} />
          <SkillCategory title="Libraries & Tools" skills={toolsSkills} />

        </div>
      </section>
    );
  }
  

export default Skills;
