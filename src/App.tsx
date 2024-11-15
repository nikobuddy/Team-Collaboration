import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/auth/forgetpass';
import Login from './pages/auth/login';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/singup';
import MemberProtectedDashboardLayout from './pages/components/members/memberProtectedDashboardLayout';
import ErrorPage from './pages/error/error_page';
import { AuthProvider } from './pages/firebase/AuthContext';
import AdminDashboard from './pages/home/page/AdminDashboard';
import MembersDashboard from './pages/home/page/membersDashboard';
import MDashboard from './pages/components/members/Pages/Dashboard';

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
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/member-dashboard" element={<MDashboard />} />

          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
