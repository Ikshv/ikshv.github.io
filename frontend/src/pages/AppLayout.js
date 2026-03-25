import React, { useState } from 'react';
import Header from '../components/Header';
import SiteSidebar from '../components/SiteSidebar';
import './AppLayout.css';
import VantaBackground from '../components/Background3D';
import Footer from '../components/Footer';

function AppLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="app-layout min-h-screen min-h-[100dvh] flex flex-col">
      <VantaBackground />
      <Header title="Isaac's Portfolio" toggleSidebar={toggleSidebar} />
      <div className="layout-body flex flex-1 min-h-0 min-w-0 w-full relative">
        <SiteSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="main-content flex flex-1 min-h-0 min-w-0 flex-col">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
