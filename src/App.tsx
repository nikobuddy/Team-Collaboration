import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/auth/login';
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

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedDashboardLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/github" element={<GitHubHistory username="nikobuddy" repo="Team-Collaboration" />} />
            <Route path="/MainTeamSection" element={<MainTeamSection />} />

            
            <Route path="/commite" element={<CommitHistory username="nikobuddy" repo="Team-Collaboration" />} />
            <Route path="/message/:userId" element={<MessagePage />} />
            <Route path="/massage" element={<Chat />} />
            <Route path="/personaltext" element={<PrivateChatPage />} />

            
            
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
