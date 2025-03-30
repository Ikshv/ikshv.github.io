import React from 'react';
import ExperienceCard from '../components/ExperienceCard';
import './Experience.css'; // Assuming you have a CSS file for styling

const experiences = [
    {
        id: 1,
        jobTitle: "Frontend Developer",
        companyName: "Bokam Engineering",
        startDate: "2022-01-01",
        endDate: "2023-01-01",
        description: "I developed user-friendly web applications using React.",
        projects: [
            {
                name: "Calibration Systems",
                summary: "Developed a web application for calibrating JOY equipment.",
                technologies: ["React", "JavaScript", "CSS"],
                highlights: [
                    "Implemented responsive design.",
                    "Optimized performance for faster load times."
                ]
            },
            {
                name: "Data Pipelines",
                summary: "Built a data pipeline for processing vehicular steering.",
                technologies: ["Python", "Pandas", "NumPy"],
                highlights: [
                    "Automated data cleaning and transformation.",
                    "Integrated with external APIs for data retrieval."
                ]
            },
            {
                name: "Technical Documentation",
                summary: "Created comprehensive documentation for various projects.",
                technologies: ["Markdown", "Git"],
                highlights: [
                    "Ensured clarity and consistency in documentation.",
                    "Collaborated with engineers to gather requirements."
                ]
            }
        ]
    },
    {
        id: 2,
        jobTitle: "Data Analyst",
        companyName: "Gatekeeper Systems",
        location: "Irvine, CA",
        startDate: "2022-07-01",
        endDate: "2023-04-01",
        description: "Owned reporting systems and data pipelines to support subscription services, theft analytics, and customer reports.",
        projects: [
          {
            name: "Subscription Reporting System",
            summary: "Managed and enhanced reporting for customer device subscriptions and service renewals.",
            technologies: ["SQL", "Looker", "Python"],
            highlights: [
              "Built and maintained dashboards for thousands of retail locations.",
              "Automated subscription cleanup and status sync across databases."
            ]
          },
          {
            name: "Theft & System Issue Analytics",
            summary: "Developed reports to analyze theft events and monitor hardware health.",
            technologies: ["Looker", "Jira", "Python"],
            highlights: [
              "Created dashboards for pushout theft tracking by division/store.",
              "Worked with engineering to triage system errors from device telemetry."
            ]
          }
        ]
      }
      
];

function Experiences() {
    return (
      <section id="experience" className="experience">
        <h1 className="experience-title">Experience</h1>
        <div className="experience-list">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} {...experience} />
          ))}
        </div>
      </section>
    );
  }
  

export default Experiences;
