import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase/firebase'; // Firebase setup

interface TeamMember {
  email: string;
  status: 'pending' | 'joined';
}

interface Team {
  teamName: string;
  uniqueCode: string;
  numMembers: number;
  gitHubApiKey: string;
  members: TeamMember[];
}

const TeamDetails = () => {
  const { teamCode } = useParams(); // Get teamCode from the URL
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!teamCode) {
        setError('Team code is missing.');
        return;
      }

      try {
        const teamRef = doc(db, 'teams', teamCode);
        const teamSnap = await getDoc(teamRef);

        if (teamSnap.exists()) {
          setTeam(teamSnap.data() as Team);
        } else {
          setError('Team not found.');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch team data.');
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamCode]);

  // Handle member status update
  const handleStatusUpdate = async (email: string, status: 'joined' | 'pending') => {
    if (team) {
      try {
        const updatedMembers = team.members.map((member) =>
          member.email === email ? { ...member, status } : member
        );
        await updateDoc(doc(db, 'teams', team.uniqueCode), {
          members: updatedMembers,
        });
      } catch (err) {
        setError('Failed to update member status.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1d1e26]">
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Team Details</h2>

        {loading ? (
          <div className="flex justify-center items-center text-white">
            <span>Loading team details...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : team ? (
          <>
            <div className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl text-white font-semibold">Team Info</h3>
              <p className="text-white">Team Name: {team.teamName}</p>
              <p className="text-white">Unique Team Code: {team.uniqueCode}</p>
              <p className="text-white">GitHub API Key: {team.gitHubApiKey}</p>
              <p className="text-white">Total Members: {team.numMembers}</p>
            </div>

            <div className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl text-white font-semibold mb-4">Team Members</h3>
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-[#3a3f50]">
                  <tr>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {team.members.map((member) => (
                    <tr key={member.email} className="bg-[#292b38] border-b border-gray-700">
                      <td className="py-3 px-6">{member.email}</td>
                      <td className="py-3 px-6">
                        <span
                          className={`font-semibold ${
                            member.status === 'joined' ? 'text-green-500' : 'text-yellow-500'
                          }`}
                        >
                          {member.status === 'joined' ? 'Joined' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {member.status === 'pending' && (
                          <button
                            onClick={() => handleStatusUpdate(member.email, 'joined')}
                            className="px-4 py-2 bg-[#ff5e84] text-white rounded-full hover:bg-[#ff6a92] transition duration-200"
                          >
                            Mark as Joined
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TeamDetails;
