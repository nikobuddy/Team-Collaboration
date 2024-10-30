// Sidebar.tsx
import { Avatar } from 'antd';
import { ChevronFirst, ChevronLast } from 'lucide-react';
import React from 'react';
import SidebarContent from './SidebarContent';

type SidebarProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ expanded, setExpanded }) => {
  return (
    <aside
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out mt-20 ${
        expanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Header with Avatar and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-600">
        <div className="flex items-center">
          <Avatar className="bg-blue-500">U</Avatar>
          <span className={`ml-4 text-lg ${expanded ? 'block' : 'hidden'}`}>User Name</span>
        </div>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 p-2">
        <SidebarContent expanded={expanded} />
      </div>
    </aside>
  );
};

export default Sidebar;
