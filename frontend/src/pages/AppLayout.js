import React, { useState } from 'react';
import Header from '../components/Header';
import SiteSidebar from '../components/SiteSidebar';
import './AppLayout.css';
import VantaBackground from '../components/Background3D';

function AppLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="app-layout">
        <VantaBackground />
      <Header title="My Site" toggleSidebar={toggleSidebar} />
      <div className="layout-body">
        <SiteSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
