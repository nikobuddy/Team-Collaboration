import {
  Bell,
  Calendar,
  Clock,
  Home,
  Layers,
  Layout,
  ListChecks,
  Milestone,
  User,
  Users,
} from 'lucide-react';

import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

type AdminSidebarContentProps = {
  expanded: boolean;
};

const AdminSidebarContent: React.FC<AdminSidebarContentProps> = ({ expanded }) => {
  return (
    <Menu
      mode="inline"
      theme="dark"
      className="bg-[#292b38] text-white"
      style={{ border: 'none' }}
    >
      {/* Dashboard */}
      <Menu.Item key="dashboard" icon={<Home className="text-lg" />}>
        <Link to="/admin/dashboard" className="flex items-center">
          {expanded && <span className="ml-2">Dashboard</span>}
        </Link>
      </Menu.Item>

      {/* Projects */}
      <Menu.Item key="projects" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/admin/projects" className="flex items-center">
          <Layout className="text-sm mr-2" />
          {expanded && <span className="ml-2">Projects</span>}
        </Link>
      </Menu.Item>

      {/* Task Management */}
      <Menu.Item key="tasks" className="bg-[#292b38] text-white hover:bg-gray-800">
        <Link to="/admin/tasks" className="flex items-center">
          <ListChecks className="text-sm mr-2" />
          {expanded && <span className="ml-2">Tasks</span>}
        </Link>
      </Menu.Item>

      {/* Resource Management */}
      <Menu.Item key="resources" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/admin/resources" className="flex items-center">
          <Users className="text-sm mr-2" />
          {expanded && <span className="ml-2">Resources</span>}
        </Link>
      </Menu.Item>

      {/* GitHub Versions */}
      <Menu.Item key="versions" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/admin/versions" className="flex items-center">
          <Layers className="text-sm mr-2" />
          {expanded && <span className="ml-2">GitHub Versions</span>}
        </Link>
      </Menu.Item>

      {/* Notifications */}
      <Menu.Item key="notifications" icon={<Bell className="text-lg" />}>
        <Link to="/admin/notifications" className="flex items-center">
          {expanded && <span className="ml-2">Notifications</span>}
        </Link>
      </Menu.Item>

      {/* Calendar Management */}
      <Menu.Item key="calendar" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/admin/calendar" className="flex items-center">
          <Calendar className="text-sm mr-2" />
          {expanded && <span className="ml-2">Calendar</span>}
        </Link>
      </Menu.Item>

      {/* Deadlines */}
      <Menu.Item key="deadlines" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/admin/deadlines" className="flex items-center">
          <Clock className="text-sm mr-2" />
          {expanded && <span className="ml-2">Deadlines</span>}
        </Link>
      </Menu.Item>

      {/* Meetings */}
      <Menu.Item key="meetings" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/admin/meetings" className="flex items-center">
          <Users className="text-sm mr-2" />
          {expanded && <span className="ml-2">Meetings</span>}
        </Link>
      </Menu.Item>

      {/* Milestones */}
      <Menu.Item key="milestones" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/admin/milestones" className="flex items-center">
          <Milestone className="text-sm mr-2" />
          {expanded && <span className="ml-2">Milestones</span>}
        </Link>
      </Menu.Item>

      {/* User Management Section */}
      <Menu.Item key="user-management" icon={<User className="text-lg" />}>
        <Link to="/admin/users" className="flex items-center">
          {expanded && <span className="ml-2">User Management</span>}
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default AdminSidebarContent;