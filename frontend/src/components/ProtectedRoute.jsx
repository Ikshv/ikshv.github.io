// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // While checking auth state, you might want to show a loader
  if (loading) {
    return <div>Loading...</div>; // or null, or a spinner
  }

  // Once loading is complete, if there's no user, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
