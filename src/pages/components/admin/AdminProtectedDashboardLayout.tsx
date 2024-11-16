// src/pages/components/ProtectedDashboardLayout.js
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../../firebase/ProtectedRoute';
import DashboardLayout from './AdminDashboardLayout';

const AdminProtectedDashboardLayout = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className='p-5 bg-[#292b38]'>
        <Outlet />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AdminProtectedDashboardLayout;
