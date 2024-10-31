// src/pages/components/ProtectedDashboardLayout.js
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../firebase/ProtectedRoute';
import DashboardLayout from './DashboardLayout';

const ProtectedDashboardLayout = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default ProtectedDashboardLayout;
