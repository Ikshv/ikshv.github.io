import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DashboardProjectAdmin from '../components/DashboardProjectAdmin';
import DashboardEmploymentTable from '../components/DashboardEmploymentTable';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <section className="flex flex-col flex-1 min-h-0 w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-6 pb-8 text-white">
      <header className="shrink-0 rounded-xl border border-white/20 bg-white/10 backdrop-blur-lg p-5 mb-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-gray-300 text-sm">
              Signed in as <span className="text-white">{user.email}</span>
              <span className="text-gray-400"> · role: {user.role}</span>
            </p>
            <p className="text-gray-500 text-xs mt-2 hidden lg:block">
              Two panels below scroll independently. Resize the window to stack on small screens.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
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

        {user.role === 'developer' ? (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-gray-300 text-sm">
              <span className="text-white font-medium">Developer</span> — routes like{' '}
              <code className="text-gray-200">/dev-tools</code> need{' '}
              <code className="text-gray-200">developer</code> in Supabase user metadata.
            </p>
          </div>
        ) : user.role === 'client' ? (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-gray-300 text-sm">
              <span className="text-white font-medium">Client</span> — manage portfolio repos and
              employment in the panels below.
            </p>
          </div>
        ) : (
          <p className="text-gray-300 text-sm mt-3 pt-3 border-t border-white/10">
            No recognized role in metadata.
          </p>
        )}
      </header>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-4 lg:gap-0 lg:divide-x lg:divide-white/15">
        <div className="flex flex-col flex-1 min-h-0 min-w-0 basis-0 lg:pr-5 lg:h-full">
          <DashboardProjectAdmin />
        </div>
        <div className="flex flex-col flex-1 min-h-0 min-w-0 basis-0 lg:pl-5 lg:h-full">
          <DashboardEmploymentTable />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
