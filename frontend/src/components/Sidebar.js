import React from 'react';
import { HashLink } from 'react-router-hash-link';

function Sidebar() {
    return (
        <div style={{ position: 'fixed', top: 100, left: 0, padding: '1rem', backgroundColor: '#333', color: '#fff', zIndex: 1000 }}>
            <nav>
                <HashLink smooth to="#top">Back to the top</HashLink> <br/>
                <HashLink smooth to="#experience">Experience</HashLink> <br/>
                <HashLink smooth to="#skills">Skills</HashLink>
            </nav>
        </div>
    );
}

export default Sidebar;
