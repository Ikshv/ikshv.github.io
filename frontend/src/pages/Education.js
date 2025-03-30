import React from 'react';
import './Education.css';


function Education() {
  return (
    <div className="education-container">
      <h2>Education</h2>
      <div className="education-card">
        <h3>University of California, Irvine</h3>
        <p>Masters of Science in Computer Science</p>
        <p>Graduated: May 2024</p>
        <p>Relevant Coursework: Data Structures, Algorithms, Web Development</p>
      </div>
      <div className="education-card">
        <h3>University of California, Riverside</h3>
        <p>Bachelor of Arts in Economics / Law & Society</p>
        <p>Graduated: June 2020</p>
        <p>Relevant Coursework: Business Law, Economics, Sociology</p>
      </div>
    </div>
  );
}
export default Education;