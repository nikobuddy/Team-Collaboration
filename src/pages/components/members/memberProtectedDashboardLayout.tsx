// src/pages/components/ProtectedDashboardLayout.js
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../../firebase/ProtectedRoute';
import DashboardLayout from './memberDashboardLayout';

const MemberProtectedDashboardLayout = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default MemberProtectedDashboardLayout;
