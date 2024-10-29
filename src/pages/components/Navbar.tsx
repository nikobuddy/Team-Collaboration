import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {/* Logo and Brand Name */}
        <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl font-semibold text-gray-800">Bike Builders</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-600 hover:text-gray-800">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
        </button>
        
        {/* Profile Icon */}
        <button className="text-gray-600 hover:text-gray-800">
          <UserCircleIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
