import React from 'react';
import ExperienceCard from '../components/ExperienceCard';
import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    companyName: "Bokam Engineering",
    startDate: "Jan 2022",
    endDate: "Jan 2023",
    description: "Developed internal applications to streamline calibration workflows and data acquisition pipelines.",
    projects: [
      {
        name: "Calibration Systems",
        summary: "Created a React-based app for calibrating JOY mining equipment, replacing paper-based workflows.",
        technologies: ["React", "JavaScript", "CSS"],
        highlights: [
          "Enabled 1000+ devices to be calibrated digitally.",
          "Cut processing time by 60%."
        ]
      },
      {
        name: "Data Pipelines",
        summary: "Automated telemetry and diagnostic stream processing for vehicular input systems.",
        technologies: ["Python", "Pandas", "NumPy"],
        highlights: [
          "Improved error detection during testing.",
          "Interfaced with hardware data streams over CAN."
        ]
      }
    ]
  },
  {
    id: 2,
    jobTitle: "Data Analyst",
    companyName: "Gatekeeper Systems",
    startDate: "Jul 2022",
    endDate: "Apr 2023",
    description: "Owned Looker dashboards and backend analytics for subscription services and theft analytics.",
    projects: [
      {
        name: "Subscription Reporting System",
        summary: "Managed reporting pipelines for 2000+ retail locations.",
        technologies: ["SQL", "Looker", "Python"],
        highlights: [
          "Automated alerts for expiring subscriptions.",
          "Reduced reporting lag by 75%."
        ]
      },
      {
        name: "Theft & System Analytics",
        summary: "Created executive dashboards for pushout theft data and device telemetry.",
        technologies: ["Looker", "Jira", "Python"],
        highlights: [
          "Helped prioritize engineering fixes with data-driven insights.",
          "Detected 3k+ anomalies from telemetry logs."
        ]
      }
    ]
  }
];

function Experiences() {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-2 text-white">
      <h2 className="text-4xl font-bold mb-10 text-center">Experience</h2>

      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <ExperienceCard {...exp} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Experiences;
