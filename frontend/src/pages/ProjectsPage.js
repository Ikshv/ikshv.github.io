import AIPillar from '../components/Pillars/AIPillar';
import DevOpsPillar from '../components/Pillars/DevOpsPillar';
import FullStackPillar from '../components/Pillars/FullStackPillar';

import { Link } from 'react-router-dom';

function ProjectsPage() {
  return (
    <main className="px-6 py-12 max-w-6xl mx-auto">
      <AIPillar />
      <DevOpsPillar />
      <FullStackPillar />

      <div className="flex justify-center mt-10">
    <Link
        to="/projects"
        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
    >
        See All Projects →
    </Link>
</div>
    </main>
  );
}

export default ProjectsPage;