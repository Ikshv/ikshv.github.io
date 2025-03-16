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
        <div id='skills' className='skills'>
            <h2>Skills</h2>
            <h3>Languages</h3>
            <div className='skills-grid'>
                {languagesSkills.map((skill, index) => (
                    <SkillsCard key={index} {...skill} />
                ))}
            </div>
            <h3>Frontend</h3>
            <div className='skills-grid'>
                {frontendSkills.map((skill, index) => (
                    <SkillsCard key={index} {...skill} />
                ))}
            </div>
            <h3>Backend</h3>
            <div className='skills-grid'>
                {backendSkills.map((skill, index) => (
                    <SkillsCard key={index} {...skill} />
                ))}
            </div>
            <h3>Databases</h3>
            <div className='skills-grid'>
                {databasesSkills.map((skill, index) => (
                    <SkillsCard key={index} {...skill} />
                ))}
            </div>
            <h3>Libraries & Tools</h3>
            <div className='skills-grid'>
                {toolsSkills.map((skill, index) => (
                    <SkillsCard key={index} {...skill} />
                ))}
            </div>
        </div>
    );
}

export default Skills;
