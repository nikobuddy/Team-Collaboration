import { Avatar, Dropdown, Menu, Popconfirm } from 'antd';
import { MenuIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

type NavbarProps = {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ drawerOpen, setDrawerOpen }) => {
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
    <header className="fixed top-0 left-0 w-full bg-cyan-600 shadow-lg flex items-center justify-between p-4 h-[80px] z-50">
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle for mobile screens */}
        <MenuIcon
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setDrawerOpen(!drawerOpen)}
        />
        <a href="/" className="text-white text-lg font-semibold">My Dashboard</a>
      </div>

      <div className="flex items-center gap-6">
        <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
          <Avatar className="bg-blue-500">U</Avatar>
        </Dropdown>
      </div>
    </header>
  );
};

export default Navbar;
