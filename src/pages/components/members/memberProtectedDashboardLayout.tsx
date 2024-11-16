// src/pages/components/ProtectedDashboardLayout.js
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../../firebase/ProtectedRoute';
import DashboardLayout from './memberDashboardLayout';

const MemberProtectedDashboardLayout = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className='bg-[#292b38] p-2'>
        <Outlet />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default MemberProtectedDashboardLayout;
