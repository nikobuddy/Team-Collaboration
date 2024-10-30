import { Avatar, Dropdown, Menu, Popconfirm } from 'antd';
import { ChevronFirst, ChevronLast, Home, Settings } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

type SidebarProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>; // Add this prop to toggle expansion
};

const Sidebar: React.FC<SidebarProps> = ({ expanded, setExpanded }) => {
  const profileMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/user">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Popconfirm
          title="Logout"
          description="Are you sure to logout?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => console.log('Logout')}
        >
          <div>Logout</div>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <aside
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out mt-20 ${
        expanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-600">
        <div className="flex items-center">
          <Avatar className="bg-blue-500">U</Avatar>
          <span className={`ml-4 text-lg ${expanded ? 'block' : 'hidden'}`}>User Name</span>
        </div>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <ul>
          <li className="flex items-center p-2 rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105">
            <Link to="/dashboard" className="flex items-center">
              <Home className="mr-4" /> {/* Icon */}
              {expanded && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="flex items-center p-2 rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105">
            <Link to="/settings" className="flex items-center">
              <Settings className="mr-4" /> {/* Icon */}
              {expanded && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-600">
        <Dropdown overlay={profileMenu} trigger={['click']} arrow>
          <div className="flex items-center cursor-pointer">
            <Avatar className="bg-blue-500">U</Avatar>
            {expanded && <span className="ml-4">User Name</span>}
          </div>
        </Dropdown>
      </div>
    </aside>
  );
};

export default Sidebar;
