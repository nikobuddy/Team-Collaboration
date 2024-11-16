import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/auth/forgetpass';
import Login from './pages/auth/login';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/singup';
import AdminProtectedDashboardLayout from './pages/components/admin/AdminProtectedDashboardLayout';
import AdminDashboard from './pages/components/admin/Pages/AdminDashboard';
import ProjectAdminPage from './pages/components/admin/Pages/Aprojects';
import AdminTasks from './pages/components/admin/Pages/Atasks';
import TaskDahboard from './pages/components/admin/Pages/TaskDahboard';
import MemberProtectedDashboardLayout from './pages/components/members/memberProtectedDashboardLayout';
import MDashboard from './pages/components/members/Pages/Dashboard';
import Projects from './pages/components/members/Pages/projects';
import RepositoryDetails from './pages/components/members/Pages/RepositoryDetails';
import TaskPage from './pages/components/members/Pages/tasks';
import ErrorPage from './pages/error/error_page';
import { AuthProvider } from './pages/firebase/AuthContext';


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
            <Route path="/repositories/:id" element={<RepositoryDetails />} />
            <Route path="/dashboard" element={<MDashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/resources" element={<MDashboard />} />
            <Route path="/versions" element={<MDashboard />} />
            <Route path="/calendar" element={<MDashboard />} />
            <Route path="/deadlines" element={<MDashboard />} />
            <Route path="/meetings" element={<MDashboard />} />
            <Route path="/milestones" element={<MDashboard />} />


          </Route>

          <Route element={<AdminProtectedDashboardLayout />}>
          {/*Admin Side Dashboard*/}
          {/* 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 */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<ProjectAdminPage />} />
            <Route path="/admin/tasks" element={<AdminTasks />} />
            <Route path="/admin/user" element={<AdminTasks />} />

            
            <Route path="/admin/resources" element={<AdminDashboard />} />
            <Route path="/admin/versions" element={<AdminDashboard />} />
            <Route path="/admin/notifications" element={<AdminDashboard />} />
            <Route path="/admin/calendar" element={<AdminDashboard />} />
            <Route path="/admin/meetings" element={<AdminDashboard />} />
            <Route path="/admin/milestones" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<TaskDahboard />} />

          </Route>

          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
