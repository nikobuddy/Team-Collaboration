import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/auth/forgetpass';
import Login from './pages/auth/login';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/singup';
import AdminProtectedDashboardLayout from './pages/components/admin/AdminProtectedDashboardLayout';
import MemberProtectedDashboardLayout from './pages/components/members/memberProtectedDashboardLayout';
import MDashboard from './pages/components/members/Pages/Dashboard';
import ErrorPage from './pages/error/error_page';
import { AuthProvider } from './pages/firebase/AuthContext';
import AdminDashboard from './pages/home/page/AdminDashboard';


const App = () => {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pass" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<MemberProtectedDashboardLayout />}>
            <Route path="/member-dashboard" element={<MDashboard />} />
            <Route path="/" element={<MDashboard />} />
          </Route>

          <Route element={<AdminProtectedDashboardLayout />}>
          {/*Admin Side Dashboard*/}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<AdminDashboard />} />
            <Route path="/admin/tasks" element={<AdminDashboard />} />
            <Route path="/admin/resources" element={<AdminDashboard />} />
            <Route path="/admin/versions" element={<AdminDashboard />} />
            <Route path="/admin/notifications" element={<AdminDashboard />} />
            <Route path="/admin/calendar" element={<AdminDashboard />} />
            <Route path="/admin/meetings" element={<AdminDashboard />} />
            <Route path="/admin/milestones" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminDashboard />} />

          </Route>

          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
