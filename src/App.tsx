import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Signup from './pages/auth/singup';
import ProtectedDashboardLayout from './pages/components/ProtectedDashboardLayout';
import GitHubHistory from './pages/components/githubhistory';
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
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
