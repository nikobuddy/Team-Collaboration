import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/auth/forgetpass';
import Login from './pages/auth/login';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/singup';
import AdminProtectedDashboardLayout from './pages/components/admin/AdminProtectedDashboardLayout';
import AdminCalendar from './pages/components/admin/Pages/Acalendar';
import AdminDashboard from './pages/components/admin/Pages/AdminDashboard';
import AdminScheduleMeeting from './pages/components/admin/Pages/Ameetings';
import ProjectAdminPage from './pages/components/admin/Pages/Aprojects';
import AdminResources from './pages/components/admin/Pages/Aresources';
import AdminTasks from './pages/components/admin/Pages/Atasks';
import TaskDahboard from './pages/components/admin/Pages/TaskDahboard';
import MemberProtectedDashboardLayout from './pages/components/members/memberProtectedDashboardLayout';
import UserCalendar from './pages/components/members/Pages/calendar';
import MDashboard from './pages/components/members/Pages/Dashboard';
import UserJoinMeeting from './pages/components/members/Pages/meetings';
import Projects from './pages/components/members/Pages/projects';
import RepositoryDetails from './pages/components/members/Pages/RepositoryDetails';
import UserResources from './pages/components/members/Pages/resources';
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
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resources" element={<UserResources />} />
            <Route path="/versions" element={<MDashboard />} />
            <Route path="/calendar" element={<UserCalendar />} />
            <Route path="/deadlines" element={<MDashboard />} />
            <Route path="/meetings" element={<UserJoinMeeting />} />
            <Route path="/milestones" element={<MDashboard />} />


          </Route>

          <Route element={<AdminProtectedDashboardLayout />}>
          {/*Admin Side Dashboard*/}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<ProjectAdminPage />} />
            <Route path="/admin/tasks" element={<AdminTasks />} />
            <Route path="/admin/user" element={<AdminTasks />} />

            
            <Route path="/admin/resources" element={<AdminResources />} />
            <Route path="/admin/versions" element={<AdminDashboard />} />
            <Route path="/admin/notifications" element={<AdminDashboard />} />
            <Route path="/admin/calendar" element={<AdminCalendar />} />
            <Route path="/admin/meetings" element={<AdminScheduleMeeting />} />
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
