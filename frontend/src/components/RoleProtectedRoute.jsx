// src/components/RoleProtectedRoute.jsx
import React, { useContext } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-white">
        <p className="text-gray-300">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-white text-center">
        <h1 className="text-2xl font-bold mb-2">Not authorized</h1>
        <p className="text-gray-300 mb-6">
          This area requires a different account role. You are signed in as{' '}
          <span className="text-white">{user.role}</span>.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md transition"
        >
          Go to dashboard
        </Link>
      </div>
    );
  }

  return children;
};

export default RoleProtectedRoute;
