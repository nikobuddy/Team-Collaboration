import { Menu } from 'antd';
import {
  Calendar,
  Clock,
  Home,
  Layers,
  Layout,
  ListChecks,
  Milestone,
  Share,
  Users
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

type membersSidebarContentProps = {
  expanded: boolean;
};

const MembersSidebarContent: React.FC<membersSidebarContentProps> = ({ expanded }) => {
  return (
    <Menu
      mode="inline"
      theme="dark"
      className="bg-[#292b38] text-white"
      style={{ border: 'none' }}
    >
      {/* Dashboard */}
      <Menu.Item key="dashboard" icon={<Home className="text-lg" />}>
        <Link to="/dashboard" className="flex items-center">
          {expanded && <span className="ml-2">Dashboard</span>}
        </Link>
      </Menu.Item>

      {/* Projects */}
      <Menu.Item key="projects" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/projects" className="flex items-center">
          <Layout className="text-sm mr-2" />
          {expanded && <span className="ml-2">Projects</span>}
        </Link>
      </Menu.Item>

      {/* Tasks */}
      <Menu.Item key="tasks" className="bg-[#292b38] text-white hover:bg-gray-800">
        <Link to="/tasks" className="flex items-center">
          <ListChecks className="text-sm mr-2" />
          {expanded && <span className="ml-2">Tasks</span>}
        </Link>
      </Menu.Item>

      {/* Resource Sharing */}
      <Menu.Item key="resources" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/resources" className="flex items-center">
          <Share className="text-sm mr-2" />
          {expanded && <span className="ml-2">Resource Sharing</span>}
        </Link>
      </Menu.Item>

      {/* GitHub Versions */}
      <Menu.Item key="versions" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/versions" className="flex items-center">
          <Layers className="text-sm mr-2" />
          {expanded && <span className="ml-2">GitHub Versions</span>}
        </Link>
      </Menu.Item>

      {/* Calendar */}
      <Menu.Item key="calendar" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/calendar" className="flex items-center">
          <Calendar className="text-sm mr-2" />
          {expanded && <span className="ml-2">Calendar</span>}
        </Link>
      </Menu.Item>

      {/* Deadlines */}
      <Menu.Item key="deadlines" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/deadlines" className="flex items-center">
          <Clock className="text-sm mr-2" />
          {expanded && <span className="ml-2">Deadlines</span>}
        </Link>
      </Menu.Item>

      {/* Meetings */}
      <Menu.Item key="meetings" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/meetings" className="flex items-center">
          <Users className="text-sm mr-2" />
          {expanded && <span className="ml-2">Meetings</span>}
        </Link>
      </Menu.Item>

      {/* Milestones */}
      <Menu.Item key="milestones" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/milestones" className="flex items-center">
          <Milestone className="text-sm mr-2" />
          {expanded && <span className="ml-2">Milestones</span>}
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default MembersSidebarContent;
