import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreateTeam from './pages/admin/CreateTeam';
import ASignups from './pages/AProject/auth/Signup';
import ForgotPassword from './pages/auth/forgetpass';
import Login from './pages/auth/login';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/singup';
import MessagePage from './pages/chat/MessagePage';
import PrivateChatPage from './pages/chat/PrivateChatPage';
import Chat from './pages/chat/public';
import CommitHistory from './pages/components/CommitHistory';
import GitHubHistory from './pages/components/githubhistory';
import MainTeamSection from './pages/components/MainTeamSection';
import ProtectedDashboardLayout from './pages/components/ProtectedDashboardLayout';
import ErrorPage from './pages/error/error_page';
import { AuthProvider } from './pages/firebase/AuthContext';
import HomePage from './pages/home/page/home_page';
import CreateTeams from './pages/teams/CreateTeam';
import TeamDashboard from './pages/teams/TeamDashboard';
import TeamDetails from './pages/teams/TeamDetails';
import TeamsPage from './pages/teams/TeamsPage';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pass" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-team" element={<CreateTeams />} />
          <Route path="/members" element={<Signup />} />


          

          
          <Route path="/signups" element={<ASignups />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          
          <Route element={<ProtectedDashboardLayout />}>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:teamCode" element={<TeamDetails />} />
        <Route path="/create-team" element={<CreateTeam />} />

            <Route path="/github" element={<GitHubHistory username="nikobuddy" repo="Team-Collaboration" />} />
            <Route path="/MainTeamSection" element={<MainTeamSection />} />

            
            <Route path="/commite" element={<CommitHistory username="nikobuddy" repo="Team-Collaboration" />} />
            <Route path="/message/:userId" element={<MessagePage />} />
            <Route path="/massage" element={<Chat />} />
            <Route path="/personaltext" element={<PrivateChatPage />} />
            <Route path="/team-dashboard" element={<TeamDashboard />} />

            
            
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
