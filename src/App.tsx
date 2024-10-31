import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Signup from './pages/auth/singup';
import DashboardLayout from './pages/components/DashboardLayout';
import GitHubHistory from './pages/components/githubhistory';
import ErrorPage from './pages/error/error_page';
import { AuthProvider } from './pages/firebase/AuthContext';
import ProtectedRoute from './pages/firebase/ProtectedRoute';
import HomePage from './pages/home/page/home_page';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <HomePage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
  path="github" 
  element={<GitHubHistory username="nikobuddy" repo="Team-Collaboration" />} 
/>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
