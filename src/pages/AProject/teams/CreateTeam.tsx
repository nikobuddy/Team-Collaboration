import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [numMembers, setNumMembers] = useState<number>(0);
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        if (userData?.role !== 'leader' || userData?.teamCreated) {
          navigate('/');
        }
      } else {
        navigate('/login');
      }
    };
    checkAccess();
  }, [navigate]);

  const handleNumMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.min(parseInt(e.target.value) || 0, 10);
    setNumMembers(count);
    setMemberEmails(Array(count).fill(''));
  };

  const handleMemberEmailChange = (index: number, email: string) => {
    const updatedEmails = [...memberEmails];
    updatedEmails[index] = email;
    setMemberEmails(updatedEmails);
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName || !githubToken || !numMembers) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        // Create team with pending invitations for members
        await setDoc(doc(db, 'teams', teamName), {
          teamName,
          githubToken,
          leader: user.uid,
          members: [],
          pendingInvitations: memberEmails,
        });

        // Update user as team created
        await updateDoc(doc(db, 'users', user.uid), {
          teamCreated: true,
        });

        // Create invitations for each member
        memberEmails.forEach(async (email) => {
          await setDoc(doc(db, 'invitations', `${teamName}_${email}`), {
            teamId: teamName,
            memberEmail: email,
            status: 'pending',
          });
        });

        navigate('/team-dashboard');
      }
    } catch (err) {
      setError('Error creating team. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d1e26]">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6">
        <h2 className="text-white text-2xl font-bold text-center">Create a Team</h2>
        <form onSubmit={handleCreateTeam} className="space-y-4">
          <div className="space-y-2">
            <label className="text-white block text-sm">Team Name</label>
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-white block text-sm">GitHub Token</label>
            <input
              type="password"
              placeholder="GitHub Token"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-white block text-sm">Number of Members</label>
            <input
              type="number"
              placeholder="Number of Members"
              value={numMembers || ''}
              onChange={handleNumMembersChange}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
              required
              min={1}
              max={10}
            />
          </div>

          {numMembers > 0 && (
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Member Emails</h3>
              {Array.from({ length: numMembers }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-white block text-sm">Member {index + 1} Email</label>
                  <input
                    type="email"
                    placeholder={`Member ${index + 1} Email`}
                    value={memberEmails[index] || ''}
                    onChange={(e) => handleMemberEmailChange(index, e.target.value)}
                    className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-[#ff5e84] text-white font-semibold rounded-full hover:bg-[#ff6a92] transition duration-200"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
