import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase';

const Invitations = () => {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvitations = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Query Firestore to get the teams that this user is invited to
          const teamsRef = collection(db, 'teams');
          const q = query(teamsRef, where('members.email', 'array-contains', user.email));
          const querySnapshot = await getDocs(q);
          const teams = querySnapshot.docs.map((doc) => doc.data());
          setInvitations(teams);
        } catch (err) {
          setError('Failed to fetch invitations');
        }
      }
    };

    fetchInvitations();
  }, []);

  const handleJoinTeam = async (teamCode: string) => {
    try {
      const teamRef = doc(db, 'teams', teamCode);
      const teamSnap = await getDoc(teamRef);

      if (teamSnap.exists()) {
        const teamData = teamSnap.data();
        const updatedMembers = teamData.members.map((member: any) => {
          if (member.email === auth.currentUser?.email) {
            member.status = 'joined';
          }
          return member;
        });

        await updateDoc(teamRef, { members: updatedMembers });
        setInvitations((prev) =>
          prev.filter((team) => team.uniqueCode !== teamCode)
        );
      }
    } catch (err) {
      setError('Failed to join team');
    }
  };

  return (
    <div className="min-h-screen bg-[#1d1e26]">
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Team Invitations</h2>

        {error && <div className="text-red-500 text-center">{error}</div>}

        {invitations.length === 0 ? (
          <div className="text-white text-center">You have no pending invitations</div>
        ) : (
          <ul>
            {invitations.map((team, index) => (
              <li key={index} className="bg-[#292b38] p-6 mb-4 rounded-lg">
                <h3 className="text-xl text-white font-semibold">{team.teamName}</h3>
                <p className="text-white">Unique Code: {team.uniqueCode}</p>
                <button
                  onClick={() => handleJoinTeam(team.uniqueCode)}
                  className="mt-4 px-4 py-2 bg-[#ff5e84] text-white rounded-full hover:bg-[#ff6a92] transition duration-200"
                >
                  Accept Invitation
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Invitations;
