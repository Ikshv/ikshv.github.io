import React from 'react';
import Hero from '../components/Hero';
import Skills from './Skills';
import Sidebar from '../components/Sidebar';
import Repos from './Repos';
import HighlightsRow from '../components/HighlightsRow';
import Contact from './Contact';
import AboutSummary from '../components/AboutSummary';
import SkillsPreview from '../components/SkillsPreview';
import { Link } from 'react-router-dom';


function Home() {
    return (
        <main className="home">
            <Sidebar /> {/* or Sidebar, if that's your final one */}
            <section id="top">
                <Hero />
            </section>
            <section id="featured">
                <HighlightsRow />
            </section>
            <AboutSummary />
            <SkillsPreview />
            
            <Contact />

            {/* Add other sections here in similar format */}
        </main>
    );
}

export default Home;
