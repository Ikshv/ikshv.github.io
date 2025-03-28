import React, { useState } from 'react';
import Header from '../components/Header';
import SiteSidebar from '../components/SiteSidebar';

function AppLayout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
  
    return (
      <div className="app-layout">
        <Header toggleSidebar={toggleSidebar} title={"APP"} subtitle={"applique"}/>
        <SiteSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main>{children}</main>
      </div>
    );
  }
  
  export default AppLayout;