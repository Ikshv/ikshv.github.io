import React from 'react';
import Hero from '../components/Hero';
import Api from '../components/ApiReceiver'
import Skills from './Skills';
import Experience from './Experience';
import Sidebar from '../components/Sidebar';
import SiteSidebar from '../components/SiteSidebar';
import Education from './Education';

function Home() {
    return (
        <main className='home'>
            {/* <Api /> */}
            {/* <Sidebar /> */}
            {/* <SiteSidebar /> */}
            {/* <Hero /> */}
            <Education />
            <Experience />
            <Skills />
            {/* add additional sections below */}
        </main>
    );
}

export default Home;