import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DashboardProjectAdmin from '../components/DashboardProjectAdmin';
import DashboardEmploymentTable from '../components/DashboardEmploymentTable';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <section className="max-w-3xl mx-auto px-6 py-10 text-white">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-300 mb-6">
          Signed in as <span className="text-white">{user.email}</span>
          <span className="text-gray-400"> · role: {user.role}</span>
        </p>

        {user.role === 'developer' ? (
          <div className="border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold mb-2">Developer</h2>
            <p className="text-gray-300 text-sm mb-4">
              Role-gated routes like <code className="text-gray-200">/dev-tools</code> are available
              when your Supabase user has <code className="text-gray-200">developer</code> in app or
              user metadata.
            </p>
          </div>
        ) : user.role === 'client' ? (
          <div className="border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold mb-2">Client area</h2>
            <p className="text-gray-300 text-sm">
              This is your signed-in home. Add project-specific content here as you build it out.
            </p>
          </div>
        ) : (
          <p className="text-gray-300">You do not have a recognized role.</p>
        )}

        <DashboardProjectAdmin />

        <DashboardEmploymentTable />

        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white/15 hover:bg-white/25 rounded-md transition text-sm"
          >
            Back to home
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center px-4 py-2 bg-red-600/90 hover:bg-red-600 rounded-md transition text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
