import React from 'react';
// import './Skills.css';
import { 
  DiJavascript1, DiReact, DiCss3, DiHtml5, DiNodejs, DiJava 
} from 'react-icons/di';
import { 
  SiRedux, SiExpress, SiMongodb, SiPython, SiPostgresql, 
  SiFlask, SiSqlite, SiTensorflow 
} from 'react-icons/si';
import SkillsCard from '../components/SkillsCard';

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
        <h2 className="text-4xl font-bold mb-10">Skills</h2>
  
        {/* Each category block */}
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {languagesSkills.map((skill, index) => (
                <SkillsCard key={index} {...skill} />
              ))}
            </div>
          </div>
  
          <div>
            <h3 className="text-2xl font-semibold mb-6">Frontend</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {frontendSkills.map((skill, index) => (
                <SkillsCard key={index} {...skill} />
              ))}
            </div>
          </div>
  
          <div>
            <h3 className="text-2xl font-semibold mb-6">Backend</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {backendSkills.map((skill, index) => (
                <SkillsCard key={index} {...skill} />
              ))}
            </div>
          </div>
  
          <div>
            <h3 className="text-2xl font-semibold mb-6">Databases</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {databasesSkills.map((skill, index) => (
                <SkillsCard key={index} {...skill} />
              ))}
            </div>
          </div>
  
          <div>
            <h3 className="text-2xl font-semibold mb-6">Libraries & Tools</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {toolsSkills.map((skill, index) => (
                <SkillsCard key={index} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  

export default Skills;
