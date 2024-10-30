// SidebarContent.tsx
import { Menu } from 'antd';
import { Bell, Briefcase, Calendar, Clock, Home, Layers, Layout, ListChecks, Milestone, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link to="/dashboard" className="flex items-center">
          {expanded && <span className="ml-2">Dashboard</span>}
        </Link>
      </Menu.Item>

      {/* Projects Submenu */}
      <Menu.SubMenu
        key="projects"
        title={
          <span className="flex items-center">
            <Briefcase className="text-lg" />
            {expanded && <span className="ml-2">Projects</span>}
          </span>
        }
        popupClassName="bg-transparent"
      >
        <Menu.Item key="uiux" className="bg-[#1F2937] text-white hover:bg-gray-700">
          <Link to="/projects/uiux">
            <Layout className="text-sm mr-2" /> 
            UI/UX
          </Link>
        </Menu.Item>
        <Menu.Item key="task" className="bg-[#1F2937] text-white hover:bg-gray-700">
          <Link to="/projects/task">
            <ListChecks className="text-sm mr-2" />
            Task
          </Link>
        </Menu.Item>
        <Menu.Item key="resource" className="bg-[#1F2937] text-white hover:bg-gray-700">
          <Link to="/projects/resource">
            <Users className="text-sm mr-2" />
            Resource
          </Link>
        </Menu.Item>
        <Menu.Item key="version" className="bg-[#1F2937] text-white hover:bg-gray-700">
          <Link to="/projects/version">
            <Layers className="text-sm mr-2" />
            Version
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* Notifications */}
      <Menu.Item key="notifications" icon={<Bell className="text-lg" />}>
        <Link to="/notifications" className="flex items-center">
          {expanded && <span className="ml-2">Notifications</span>}
        </Link>
      </Menu.Item>

      {/* Calendar Management Submenu */}
      <Menu.SubMenu
        key="calendarManagement"
        title={
          <span className="flex items-center">
            <Calendar className="text-lg" />
            {expanded && <span className="ml-2">Calendar Management</span>}
          </span>
        }
        popupClassName="bg-transparent"
      >
        <Menu.Item key="calendar" className="bg-[#1F2937] text-white hover:bg-gray-700">
          <Link to="/calendar-management/calendar">
            <Calendar className="text-sm mr-2" />
            Calendar
          </Link>
        </Menu.Item>
        <Menu.Item key="deadlines" className="bg-[#1F2937] text-white hover:bg-gray-700">
          <Link to="/calendar-management/deadlines">
            <Clock className="text-sm mr-2" />
            Deadlines
          </Link>
        </Menu.Item>
        <Menu.Item key="meetings" className="bg-[#1F2937] text-white hover:bg-gray-700">
          <Link to="/calendar-management/meetings">
            <Users className="text-sm mr-2" />
            Meetings
          </Link>
        </Menu.Item>
        <Menu.Item key="milestones" className="bg-[#1F2937] text-white hover:bg-gray-700">
          <Link to="/calendar-management/milestones">
            <Milestone className="text-sm mr-2" />
            Milestones
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default SidebarContent;
