// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Hello from './Hello';
import Counter from './Counter';
import NameInput from './NameInput';
import DataFetcher from './DataFetcher';
import ToggleMessage from './ToggleMessage';
import WebcamPage from './pages/WebcamPage';
import './App.css';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import UploadProject from './pages/UploadProject';
import AppLayout from './pages/AppLayout';
import Skills from './pages/Skills';
import Education from './pages/Education';

import { AnimatePresence } from 'framer-motion';
import Contact from './pages/Contact';
import AboutPage from './pages/AboutPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
      <AppLayout>
        <AnimatePresence mode="wait">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hello" element={<Hello name="world" />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/nameinput" element={<NameInput />} />
          <Route path="/datafetcher" element={<DataFetcher />} />
          <Route path="/togglemessage" element={<ToggleMessage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new-" element={<UploadProject />} />
          <Route path="/webcam" element={<WebcamPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dev-tools"
            element={
              <RoleProtectedRoute allowedRoles={['developer']}>
                {/* <DeveloperToolsPage /> */}
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/client-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['client']}>
                {/* <ClientDashboardPage /> */}
              </RoleProtectedRoute>
            }
          />

        </Routes>
        </AnimatePresence>
      </AppLayout>
  );
}

export default App;
