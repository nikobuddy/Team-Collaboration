import React, { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // State for sidebar toggle

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar spans full width */}
      <Navbar drawerOpen={isSidebarExpanded} setDrawerOpen={setIsSidebarExpanded} />

      {/* Content below navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar expanded={isSidebarExpanded} setExpanded={setIsSidebarExpanded} /> {/* Pass setExpanded prop */}

        {/* Main Content Area */}
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarExpanded ? 'mt-20' : 'mt-20'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
