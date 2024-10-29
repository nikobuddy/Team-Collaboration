import { ChartBarIcon, CogIcon, HomeIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white w-64 h-full px-4 py-8 space-y-8">
      <nav>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
            <HomeIcon className="w-6 h-6" />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
            <ChartBarIcon className="w-6 h-6" />
            <span>Analytics</span>
          </li>
          <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
            <CogIcon className="w-6 h-6" />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;