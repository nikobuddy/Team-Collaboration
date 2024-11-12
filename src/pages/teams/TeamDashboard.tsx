import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';

const TeamDashboard = () => {
  const [team, setTeam] = useState<any>(null);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!user) return navigate('/');
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      if (userData?.role !== 'leader') return navigate('/');
      
      // Fetch team data by leader's team ID
      const teamDoc = await getDoc(doc(db, 'teams', userData.teamId));
      setTeam(teamDoc.data());
    };
    fetchTeamData();
  }, [user, navigate]);

  const handleAddMember = async () => {
    if (!newMemberEmail) {
      setError('Please provide an email.');
      return;
    }

    try {
      // Add the invitation to the team's pending invitations list
      await updateDoc(doc(db, 'teams', team.id), {
        pendingInvitations: [...team.pendingInvitations, newMemberEmail],
      });

      // Create an invitation entry
      await setDoc(doc(collection(db, 'invitations'), newMemberEmail), {
        teamId: team.id,
        memberEmail: newMemberEmail,
        status: 'pending',
      });

      setTeam((prev: any) => ({
        ...prev,
        pendingInvitations: [...prev.pendingInvitations, newMemberEmail],
      }));
      setNewMemberEmail('');
      setError('');
    } catch (err) {
      setError('Error adding member. Please try again.');
    }
  };

  const handleRemoveMember = async (memberEmail: string) => {
    try {
      await updateDoc(doc(db, 'teams', team.id), {
        acceptedMembers: team.acceptedMembers.filter((m: string) => m !== memberEmail),
      });

      setTeam((prev: any) => ({
        ...prev,
        acceptedMembers: prev.acceptedMembers.filter((m: string) => m !== memberEmail),
      }));
    } catch (err) {
      setError('Error removing member. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1d1e26] flex items-center justify-center">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-3xl w-full space-y-6">
        <h2 className="text-white text-3xl font-bold text-center">Team Dashboard</h2>

        {team && (
          <>
            <div className="text-center text-white">
              <h3 className="text-xl font-semibold">{team.name}</h3>
              <p className="text-sm text-gray-400">Led by: {user?.email}</p>
            </div>

            <div className="space-y-6">
              {/* Accepted Members */}
              <h4 className="text-lg text-white font-semibold">Accepted Members</h4>
              <ul className="space-y-2">
                {team.acceptedMembers.map((memberEmail: string, index: number) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-[#3a3f50] rounded-lg text-white text-sm">
                    {memberEmail}
                    <button
                      onClick={() => handleRemoveMember(memberEmail)}
                      className="text-red-500 text-xs underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              {/* Pending Invitations */}
              <h4 className="text-lg text-white font-semibold mt-6">Pending Invitations</h4>
              <ul className="space-y-2">
                {team.pendingInvitations.map((pendingEmail: string, index: number) => (
                  <li key={index} className="p-3 bg-[#3a3f50] rounded-lg text-white text-sm">
                    {pendingEmail} <span className="text-yellow-500">(Pending)</span>
                  </li>
                ))}
              </ul>

              {/* Add New Member */}
              <div className="space-y-2 mt-6">
                <h4 className="text-lg text-white font-semibold">Add a New Member</h4>
                <input
                  type="email"
                  placeholder="Member Email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#ff5e84]"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  onClick={handleAddMember}
                  className="w-full py-3 bg-[#ff5e84] text-white font-semibold rounded-full hover:bg-[#ff6a92] transition duration-200 mt-4"
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamDashboard;
