import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './pages/firebase/AuthContext';

import ForgotPassword from './pages/auth/forgetpass';
import Login from './pages/auth/login';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/singup';
import ChatComponent from './pages/chatcompont/ChatComponent';
import AdminProtectedDashboardLayout from './pages/components/admin/AdminProtectedDashboardLayout';
import AdminCalendar from './pages/components/admin/Pages/Acalendar';
import AddFigmaProject from './pages/components/admin/Pages/AddFigmaProject';
import CreateDeadline from './pages/components/admin/Pages/ADeadlines';
import AdminDashboard from './pages/components/admin/Pages/AdminDashboard';
import AdminScheduleMeeting from './pages/components/admin/Pages/Ameetings';
import CreateMilestone from './pages/components/admin/Pages/Amilestones';
import ProjectAdminPage from './pages/components/admin/Pages/Aprojects';
import AdminResources from './pages/components/admin/Pages/Aresources';
import AdminTasks from './pages/components/admin/Pages/Atasks';
import MemberProtectedDashboardLayout from './pages/components/members/memberProtectedDashboardLayout';
import AIBox from './pages/components/members/Pages/aibox';
import UserCalendar from './pages/components/members/Pages/calendar';
import MDashboard from './pages/components/members/Pages/Dashboard';
import Deadlines from './pages/components/members/Pages/Deadlines';
import FigmaProjects from './pages/components/members/Pages/figma';
import UserJoinMeeting from './pages/components/members/Pages/meetings';
import Milestoness from './pages/components/members/Pages/milestone';
import Projects from './pages/components/members/Pages/projects';
import RepositoryDetails from './pages/components/members/Pages/RepositoryDetails';
import UserResources from './pages/components/members/Pages/resources';
import TaskPage from './pages/components/members/Pages/tasks';
import ErrorPage from './pages/error/error_page';
import HomePage from './pages/home/page/home_page';

const App = () => {
  const { isAdmin } = useAuth(); // Dynamically determine if user is an admin

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/pass" element={<ForgotPassword />} />
          <Route path="/wadge" element={<HomePage />} />
          <Route path="/rushi" element={<ErrorPage/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Member Dashboard */}
          <Route element={<MemberProtectedDashboardLayout />}>
            <Route path="/member-dashboard" element={<MDashboard />} />
            <Route path="/" element={<MDashboard />} />
            <Route path="/repositories/:id" element={<RepositoryDetails />} />
            <Route path="/dashboard" element={<MDashboard />} />
            <Route path="/deadlines" element={<Deadlines />} />
            <Route path="/milestones" element={<Milestoness />} />
            
            
            <Route path="/tasks" element={<TaskPage isAdmin={isAdmin} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resources" element={<UserResources />} />
            <Route path="/calendar" element={<UserCalendar />} />
            <Route path="/meetings" element={<UserJoinMeeting />} />
            <Route path="/figma" element={<FigmaProjects />} />

            <Route path="/aibot" element={<AIBox />} />
            <Route path="/discussion" element={<ChatComponent />} />

            
          </Route>

          {/* Admin Dashboard */}
          <Route element={<AdminProtectedDashboardLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<ProjectAdminPage />} />
            <Route path="/admin/tasks" element={<AdminTasks />} />
            <Route path="/admin/resources" element={<AdminResources />} />
            <Route path="/admin/calendar" element={<AdminCalendar />} />
            <Route path="/admin/meetings" element={<AdminScheduleMeeting />} />
            <Route path="/admin/figma" element={<AddFigmaProject />} />
            <Route path="/admin/milestone" element={<CreateMilestone />} />
            <Route path="/admin/deadlines" element={<CreateDeadline />} />

            
            
          </Route>

          {/* Error Page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;