import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase'; // Firebase setup

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [gitHubApiKey, setGitHubApiKey] = useState('');
  const [numMembers, setNumMembers] = useState(4); // Set the number of members to 4 initially
  const [membersEmails, setMembersEmails] = useState(['', '', '', '']); // Array of email inputs
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (index: number, value: string) => {
    const updatedEmails = [...membersEmails];
    updatedEmails[index] = value;
    setMembersEmails(updatedEmails);
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName || !gitHubApiKey) {
      setError('Please fill in all the fields');
      return;
    }

    // Create the members array with the emails and "pending" status
    const members = membersEmails.map((email) => ({
      email,
      status: 'pending',
    }));

    // Create a unique code for the team (can be done in various ways)
    const uniqueCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    try {
      // Create a team document in Firestore
      await setDoc(doc(db, 'teams', uniqueCode), {
        teamName,
        gitHubApiKey,
        numMembers,
        uniqueCode,
        members,
      });

      // Navigate to the Teams page
      navigate('/teams');
    } catch (err) {
      console.error('Error creating team:', err);
      setError('An error occurred while creating the team');
    }
  };

  return (
    <div className="min-h-screen bg-[#1d1e26]">
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Create Team</h2>
        
        {error && <div className="text-red-500 text-center">{error}</div>}

        <form onSubmit={handleCreateTeam} className="space-y-4">
          <div>
            <label className="text-white">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
              required
            />
          </div>
          <div>
            <label className="text-white">GitHub API Key</label>
            <input
              type="text"
              value={gitHubApiKey}
              onChange={(e) => setGitHubApiKey(e.target.value)}
              placeholder="Enter GitHub API Key"
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
              required
            />
          </div>

          <div>
            <label className="text-white">Number of Members</label>
            <input
              type="number"
              value={numMembers}
              onChange={(e) => setNumMembers(Number(e.target.value))}
              min={1}
              max={10}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
              required
            />
          </div>

          <div>
            <label className="text-white">Members' Emails</label>
            {membersEmails.slice(0, numMembers).map((email, index) => (
              <input
                key={index}
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder={`Member ${index + 1} Email`}
                className="w-full p-3 mb-2 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-full transition duration-200 bg-[#ff5e84] text-white hover:bg-[#ff6a92]"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
