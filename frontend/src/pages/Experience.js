import React from 'react';
import ExperienceCard from '../components/ExperienceCard';

const experiences = [
    {
        id: 1,
        jobTitle: "Software Developer",
        companyName: "Bokam Engineering",
        description: "I worked on developing scalable web applications."
    },
    {
        id: 2,
        jobTitle: "Data Analyst",
        companyName: "Gatekeeper Systems",
        description: "I analyzed large datasets to drive business decisions."
    },
    {
        id: 1,
        jobTitle: "Software Developer",
        companyName: "Bokam Engineering",
        description: "I worked on developing scalable web applications."
    },
    {
        id: 2,
        jobTitle: "Data Analyst",
        companyName: "Gatekeeper Systems",
        description: "I analyzed large datasets to drive business decisions."
    }
];

function Experiences() {
    return (
        <section id='experience' className='experience'>
            <h1>Experience</h1>
            {experiences.map((experience) => (
                <ExperienceCard key={experience.id} {...experience} />
            ))}
            
        </section>
    );
}

export default Experiences;
