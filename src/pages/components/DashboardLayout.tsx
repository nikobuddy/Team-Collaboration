import React, { ReactNode, useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const userName = currentUser ? currentUser.displayName || 'User' : 'User';

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar drawerOpen={isSidebarExpanded} setDrawerOpen={setIsSidebarExpanded} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          expanded={isSidebarExpanded} 
          setExpanded={setIsSidebarExpanded} 
          userName={userName}
        />

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarExpanded ? 'mt-20' : 'mt-20'}`} style={{ height: 'calc(100vh - 80px)' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
