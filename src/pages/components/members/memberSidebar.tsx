import { Avatar } from 'antd';
import { ChevronFirst, ChevronLast } from 'lucide-react';
import React from 'react';
import SidebarContent from './membersSidebarContent';

type AdminSidebarProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string; // Add userName prop
};

const AdminSidebarProps: React.FC<AdminSidebarProps> = ({ expanded, setExpanded, userName }) => {
  return (
    <aside
      className={`h-screen bg-[#292b38] text-white transition-all duration-300 ease-in-out mt-20 ${
        expanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Header with Avatar and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-600">
        <div className="flex items-center">
          <Avatar className="bg-blue-500">{userName.charAt(0)}</Avatar> {/* Display the first letter of the user's name */}
          <span className={`ml-4 text-lg ${expanded ? 'block' : 'hidden'}`}>{userName}</span> {/* Display user's name */}
        </div>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 p-0">
        <SidebarContent expanded={expanded} />
      </div>

      {/* Logout button at the bottom */}
      <div className="p-4 border-t border-[#292b38]">
        <button className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebarProps;
