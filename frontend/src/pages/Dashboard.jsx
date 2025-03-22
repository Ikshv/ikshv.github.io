// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}!</p>
      {user.role === 'developer' ? (
        <div>
          <h2>Developer Tools</h2>
          {/* Render developer-specific content */}
        </div>
      ) : user.role === 'client' ? (
        <div>
          <h2>Client Dashboard</h2>
          {/* Render client-specific content */}
        </div>
      ) : (
        <p>You do not have a recognized role.</p>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
