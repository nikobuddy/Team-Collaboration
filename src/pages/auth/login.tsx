import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d1e26]">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-sm w-full space-y-6">
        <h2 className="text-white text-2xl font-bold text-center">Log In.</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email Id"
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ff5e84] cursor-pointer"
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-400 flex items-center space-x-2">
              <input type="checkbox" className="accent-[#ff5e84]" />
              <span>Remember me</span>
            </label>
            <a href="pass" className="text-[#ff5e84] text-sm">Forgot Password</a>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-[#ff5e84] text-white font-semibold rounded-full hover:bg-[#ff6a92] transition duration-200"
          >
            Log In
          </button>
        </form>
        <div className="text-center text-white text-sm mt-4">
          Or Sign in with
        </div>
        <div className="flex justify-center space-x-4 mt-2">
          {/* Add social media icons here */}
        </div>
        <div className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account? <a href="/signup" className="text-[#ff5e84]">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;