import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className='hero'>
            <div className='hero-content'>
                <h1>Hero Section</h1>
                <p>im a full stack developer passionate about building engaging experiences</p>
                <a href="/projects" className="hero-btn">View My Work</a>
            </div>
        </section>
    );
}

export default Hero;
