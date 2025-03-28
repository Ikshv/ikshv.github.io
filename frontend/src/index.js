// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
