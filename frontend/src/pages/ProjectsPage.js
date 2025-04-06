import AIPillar from '../components/Pillars/AIPillar';
import DevOpsPillar from '../components/Pillars/DevOpsPillar';
import FullStackPillar from '../components/Pillars/FullStackPillar';

function ProjectsPage() {
  return (
    <main className="px-6 py-12 max-w-6xl mx-auto">
      <AIPillar />
      <DevOpsPillar />
      <FullStackPillar />
    </main>
  );
}

export default ProjectsPage;