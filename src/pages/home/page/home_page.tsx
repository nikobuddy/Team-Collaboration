import React from 'react';
import React, { useState } from 'react';
const HomePage = () => {
  return <div className="p-10 bg-[#FF0000FF]">
    <h1 className="text-2xl font-bold">Welcome to Bike Builders!</h1>
    <p className="mt-2">This is your dashboard.</p>
    <img src="C:\Users\Harshada jadhav\Desktop" alt="Team" />
    <p className="mt-2">This is your dashboard.</p>  
  </div>;
  

  const LoginPage = () => {
    // State for the form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // State for error message
    const [error, setError] = useState('');
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent the page from reloading on form submit
  
      // Basic validation check
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
  
      // Reset error message
      setError('');
  
      // Here you can add login logic (API call, etc.)
      console.log('Email:', email);
      console.log('Password:', password);
  
      // Example: Simulating a successful login
      alert('Login successful!');
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          
          {/* Error message */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
  
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
  
          {/* Link to Register (optional) */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    );
  };
  

const ButtonVariants = () => {
  const handlePrimaryClick = () => {
    alert('Primary Button Clicked');
  };
  
  const handleSecondaryClick = () => {
    alert('Secondary Button Clicked');
  };
  
  const handleDangerClick = () => {
    alert('Danger Button Clicked');
  };

  return (
    <div className="space-x-4">
      {/* Primary Button */}
      <button
        onClick={handlePrimaryClick}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Primary Button
      </button>

      {/* Secondary Button */}
      <button
        onClick={handleSecondaryClick}
        className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        Secondary Button
      </button>

      {/* Danger Button */}
      <button
        onClick={handleDangerClick}
        className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Danger Button
      </button>
    </div>
  );
};

export default ButtonVariants;

  
  export default LoginPage;
  

  
};

export default HomePage;