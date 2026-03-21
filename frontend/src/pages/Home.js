import React from 'react';
import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';
import HighlightsRow from '../components/HighlightsRow';
import Contact from './Contact';
import AboutSummary from '../components/AboutSummary';
import SkillsPreview from '../components/SkillsPreview';
import ProjectsPage from './ProjectsPage';


function Home() {
    return (
        <main className="home">
            <Sidebar /> {/* or Sidebar, if that's your final one */}
            <section id="top"><Hero /></section>
            <section id="highlights"><HighlightsRow /></section>
            <section id="aboutsummary"><AboutSummary /></section>
            <section id="skillspreview"><SkillsPreview /></section>            
            <ProjectsPage /> {/* This will render the ProjectsPage component */}
            <Contact />

            {/* Add other sections here in similar format */}
        </main>
    );
}

export default Home;
