import {
  Bot,
  CalendarDays,
  CheckSquare,
  FileCode2,
  Folder,
  Home,
  MessageCircle,
  Share2,
  Target,
  Timer,
  Video,
} from 'lucide-react';

import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import React from 'react';

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
          <Folder className="text-sm mr-2" />
          {expanded && <span className="ml-2">Projects</span>}
        </Link>
      </Menu.Item>

      {/* Tasks */}
      <Menu.Item key="tasks" className="bg-[#292b38] text-white hover:bg-gray-800">
        <Link to="/tasks" className="flex items-center">
          <CheckSquare className="text-sm mr-2" />
          {expanded && <span className="ml-2">Tasks</span>}
        </Link>
      </Menu.Item>

      {/* Resource Sharing */}
      <Menu.Item key="resources" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/resources" className="flex items-center">
          <Share2 className="text-sm mr-2" />
          {expanded && <span className="ml-2">Resource Sharing</span>}
        </Link>
      </Menu.Item>

      {/* GitHub Versions */}
      {/*<Menu.Item key="versions" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/versions" className="flex items-center">
          <GitBranch className="text-sm mr-2" />
          {expanded && <span className="ml-2">GitHub Versions</span>}
        </Link>
      </Menu.Item>*/}

      {/* Calendar */}
      <Menu.Item key="calendar" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/calendar" className="flex items-center">
          <CalendarDays className="text-sm mr-2" />
          {expanded && <span className="ml-2">Calendar</span>}
        </Link>
      </Menu.Item>

      {/* Deadlines */}
      <Menu.Item key="deadlines" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/deadlines" className="flex items-center">
          <Timer className="text-sm mr-2" />
          {expanded && <span className="ml-2">Deadlines</span>}
        </Link>
      </Menu.Item>

      {/* Meetings */}
      <Menu.Item key="meetings" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/meetings" className="flex items-center">
          <Video className="text-sm mr-2" />
          {expanded && <span className="ml-2">Meetings</span>}
        </Link>
      </Menu.Item>

      {/* Milestones */}
      <Menu.Item key="milestones" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/milestones" className="flex items-center">
          <Target className="text-sm mr-2" />
          {expanded && <span className="ml-2">Milestones</span>}
        </Link>
      </Menu.Item>

      {/* Figma */}
      <Menu.Item key="figma" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/figma" className="flex items-center">
          <FileCode2 className="text-sm mr-2" />
          {expanded && <span className="ml-2">Figma</span>}
        </Link>
      </Menu.Item>

      {/* AI Bot */}
      <Menu.Item key="aibot" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/aibot" className="flex items-center">
          <Bot className="text-sm mr-2" />
          {expanded && <span className="ml-2">AI Bot</span>}
        </Link>
      </Menu.Item>

      {/* Discussion */}
      <Menu.Item key="discussion" className="bg-[#292b38] text-white hover:bg-gray-700">
        <Link to="/discussion" className="flex items-center">
          <MessageCircle className="text-sm mr-2" />
          {expanded && <span className="ml-2">Discussion</span>}
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default MembersSidebarContent;
