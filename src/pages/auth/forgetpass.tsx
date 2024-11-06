import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase/firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset email has been sent to your email address.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d1e26]">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-white text-2xl font-bold text-center">Forgot Password</h2>
        <p className="text-gray-400 text-center text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && <p className="text-green-500 text-sm text-center">{message}</p>}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-[#ff5e84] text-white font-semibold rounded-full hover:bg-[#ff6a92] transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 mt-4">
          <a href="/login" className="text-[#ff5e84]">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
