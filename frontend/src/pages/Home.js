import React from 'react';
import Hero from '../components/Hero';
import Skills from './Skills';
import Experience from './Experience';
import Sidebar from '../components/Sidebar';
import Education from './Education';

function Home() {
    return (
        <main className="home">
            <Sidebar /> {/* or Sidebar, if that's your final one */}
            <section id="top">
                <Hero />
            </section>
            <section id="education">
                <Education />
            </section>

            <section id="experience">
                <Experience />
            </section>

            <section id="skills">
                <Skills />
            </section>

            {/* Add other sections here in similar format */}
        </main>
    );
}

export default Home;
