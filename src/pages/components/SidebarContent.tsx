import { Bell, Calendar, Clock, Home, Layers, Layout, ListChecks, Milestone, Users } from 'lucide-react';

import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import React from 'react';

type SidebarContentProps = {
  expanded: boolean;
};

const SidebarContent: React.FC<SidebarContentProps> = ({ expanded }) => {
  return (
    <Menu
      mode="inline"
      theme="dark"
      className="bg-gray-800 text-white"
      style={{ border: 'none' }}
    >
      {/* Dashboard */}
      <Menu.Item key="dashboard" icon={<Home className="text-lg" />}>
        <Link to="/github" className="flex items-center">
          {expanded && <span className="ml-2">Dashboard</span>}
        </Link>
      </Menu.Item>

      {/* Projects */}
      <Menu.Item key="uiux" className="bg-[#1F2937] text-white hover:bg-gray-700">
        <Link to="/massage" className="flex items-center">
          <Layout className="text-sm mr-2" />
          {expanded && <span className="ml-2">UI/UX</span>}
        </Link>
      </Menu.Item>
      <Menu.Item key="task" className="bg-[#1F2937] text-white hover:bg-gray-800">
        <Link to="/personaltext" className="flex items-center">
          <ListChecks className="text-sm mr-2" />
          {expanded && <span className="ml-2">Task</span>}
        </Link>
      </Menu.Item>
      <Menu.Item key="resource" className="bg-[#1F2937] text-white hover:bg-gray-700">
        <Link to="/" className="flex items-center">
          <Users className="text-sm mr-2" />
          {expanded && <span className="ml-2">Resource</span>}
        </Link>
      </Menu.Item>
      <Menu.Item key="version" className="bg-[#1F2937] text-white hover:bg-gray-700">
        <Link to="/" className="flex items-center">
          <Layers className="text-sm mr-2" />
          {expanded && <span className="ml-2">Version</span>}
        </Link>
      </Menu.Item>

      {/* Notifications */}
      <Menu.Item key="notifications" icon={<Bell className="text-lg" />}>
        <Link to="/" className="flex items-center">
          {expanded && <span className="ml-2">Notifications</span>}
        </Link>
      </Menu.Item>

      {/* Calendar Management */}
      <Menu.Item key="calendar" className="bg-[#1F2937] text-white hover:bg-gray-700">
        <Link to="/" className="flex items-center">
          <Calendar className="text-sm mr-2" />
          {expanded && <span className="ml-2">Calendar</span>}
        </Link>
      </Menu.Item>
      <Menu.Item key="deadlines" className="bg-[#1F2937] text-white hover:bg-gray-700">
        <Link to="/" className="flex items-center">
          <Clock className="text-sm mr-2" />
          {expanded && <span className="ml-2">Deadlines</span>}
        </Link>
      </Menu.Item>
      <Menu.Item key="meetings" className="bg-[#1F2937] text-white hover:bg-gray-700">
        <Link to="" className="flex items-center">
          <Users className="text-sm mr-2" />
          {expanded && <span className="ml-2">Meetings</span>}
        </Link>
      </Menu.Item>
      <Menu.Item key="milestones" className="bg-[#1F2937] text-white hover:bg-gray-700">
        <Link to="/" className="flex items-center">
          <Milestone className="text-sm mr-2" />
          {expanded && <span className="ml-2">Milestones</span>}
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default SidebarContent;
