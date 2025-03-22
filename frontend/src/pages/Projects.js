import React from 'react';
import ProjectCard from '../components/ProjectCard';
import './Projects.css'
import { Link } from 'react-router-dom';

const projectsData = [
    {
        title: 'Stock Market Prediction',
        description: 'This project is about predicting the stock market',
        projectUrl: 'project-1'
    },
    {
        title: 'Hyperdimensional Learning',
        description: "This project is about hyperdimensional learning",
        projectUrl: 'idk'
    },
    {
        title: 'Statistical NLP',
        description: "This project is about statistical NLP",
        projectUrl: 'idk'
    },
    {
        title: 'project 1',
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the ",
        projectUrl: 'idk'
    },
    {
        title: 'project 1',
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the ",
        projectUrl: 'idk'
    },
    {
        title: 'project 2',
        description: 'descript 2'
    }
]


function Projects() {
    return (
        <div id='projects' className='projects'>
            <Link className="nav-link" to="/projects/new-">Add a project</Link>

            <div className='projects-grid'>
                {projectsData.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </div>
    )
}

export default Projects;