import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import updateProfile
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, { displayName: name }); // Set the display name

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        password,
        uid: user.uid,
      });

      navigate('/'); // Redirect to the home page
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Bike Builders Signup</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="123-456-7890"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
