// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Header from './components/Header';
import Footer from './components/Footer';
import Hello from './Hello';
import Counter from './Counter';
import NameInput from './NameInput';
import DataFetcher from './DataFetcher';
import ToggleMessage from './ToggleMessage';
import WebcamPage from './pages/WebcamPage';
import './App.css';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import UploadProject from './pages/UploadProject';


function App() {
  return (
      <div className="App">
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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          // Inside App.jsx Routes
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
        <Footer />
      </div>
  );
}

export default App;
