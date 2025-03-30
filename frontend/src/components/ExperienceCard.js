import './ExperienceCard.css';

function ExperienceCard({
  jobTitle,
  companyName,
  location,
  startDate,
  endDate,
  description,
  projects,
}) {
  return (
    <article className="experience-card">
      <div className="experience-header">
        <div className="title-company">
          <h3>{jobTitle}</h3>
          <h4>{companyName}</h4>
        </div>
        <div className="meta">
          <span>{location}</span>
          <span>{startDate} – {endDate}</span>
        </div>
      </div>

      <p className="role-summary">{description}</p>

      {projects?.map((project, index) => (
        <div className="project-card" key={index}>
          <h5 className="project-title">{project.name}</h5>
          <p className="project-summary">{project.summary}</p>

          <div className="tech-stack">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="tech-badge">{tech}</span>
            ))}
          </div>

          <ul className="highlights">
            {project.highlights.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
}

export default ExperienceCard;
