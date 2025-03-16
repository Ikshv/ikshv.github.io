import React from 'react'

function Sidebar() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
            <nav>
                <a href="#">Back to the top</a> <br/>
                <a href="#experience">experience</a> <br/>
                <a href="#skills">skills</a>
            </nav>
        </div>
    );
}

export default Sidebar;