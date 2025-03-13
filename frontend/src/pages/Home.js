import React from 'react';
import Hero from '../components/Hero';
import Api from '../components/ApiReceiver'
function Home() {
    return (
        <div>
            {/* <h1>Personal Website</h1>
            <p>This is the home page.</p> */}
            <Api />
            <Hero />
            {/* add additional sections below */}
        </div>
    );
}

export default Home;