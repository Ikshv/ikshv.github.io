import './ExperienceCard.css'

function ExperienceCard({ jobTitle, companyName, description }) {
    return (
        <article className="experience-card">
            <h3>{jobTitle}</h3>
            <h4>{companyName}</h4>
            {description && <p>{description}</p>}
        </article>
    );
}

export default ExperienceCard;