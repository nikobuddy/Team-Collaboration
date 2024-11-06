import { confirmPasswordReset } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Capture the 'oobCode' from the URL, and set it as a string if available
  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get('oobCode') || ''; // Ensure oobCode is a string

  useEffect(() => {
    if (!oobCode) {
      setError("Invalid or expired reset link.");
    }
  }, [oobCode]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage('Your password has been reset successfully.');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d1e26]">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-white text-2xl font-bold text-center">Reset Password</h2>
        <p className="text-gray-400 text-center text-sm">
          Enter your new password below.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {message && <p className="text-green-500 text-sm text-center">{message}</p>}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-[#ff5e84] text-white font-semibold rounded-full hover:bg-[#ff6a92] transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
