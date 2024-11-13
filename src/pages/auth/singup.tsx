import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(false);
  const [role, setRole] = useState<'leader' | 'member' | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleRoleChange = (selectedRole: 'leader' | 'member') => {
    setRole(selectedRole);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, password, confirmPassword } = form;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: `${firstName} ${lastName}` });

      await setDoc(doc(db, 'users', user.uid), {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        password,
        uid: user.uid,
        role,
        hasTeam: role === 'leader' ? false : undefined, // only leaders have hasTeam status
      });

      if (role === 'leader') {
        navigate('/create-team');
      } else {
        navigate('/members');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d1e26]">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-white text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Role Selection */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="button"
              onClick={() => handleRoleChange('leader')}
              className={`w-1/2 py-3 font-semibold rounded-full transition duration-200 ${
                role === 'leader' ? 'bg-[#ff5e84] text-white' : 'bg-[#3a3f50] text-[#ff5e84]'
              }`}
            >
              Leader
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('member')}
              className={`w-1/2 py-3 font-semibold rounded-full transition duration-200 ${
                role === 'member' ? 'bg-[#ff5e84] text-white' : 'bg-[#3a3f50] text-[#ff5e84]'
              }`}
            >
              Member
            </button>
          </div>

          <label className="text-gray-400 flex items-center space-x-2">
            <input
              type="checkbox"
              className="accent-[#ff5e84]"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <span>
              I agree with <a href="#" className="text-[#ff5e84]">privacy</a> and <a href="#" className="text-[#ff5e84]">policy</a>
            </span>
          </label>
          
          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-full transition duration-200 ${
              agree ? 'bg-[#ff5e84] text-white hover:bg-[#ff6a92]' : 'bg-gray-400 text-gray-300 cursor-not-allowed'
            }`}
            disabled={!agree}
          >
            Sign Up
          </button>
        </form>
        <div className="text-center text-sm text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-[#ff5e84]">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
