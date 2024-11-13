import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase'; // Firestore setup

interface Team {
  teamName: string;
  uniqueCode: string;
  numMembers: number;
  members: { email: string; status: 'pending' | 'joined' }[];
}

const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsCollection = collection(db, 'teams');
        const teamSnapshot = await getDocs(teamsCollection);
        const teamList = teamSnapshot.docs.map((doc) => ({
          ...doc.data(),
          uniqueCode: doc.id,
        })) as Team[];

        setTeams(teamList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleViewTeam = (uniqueCode: string) => {
    navigate(`/teams/${uniqueCode}`);
  };

  return (
    <div className="min-h-screen bg-[#1d1e26]">
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Your Teams</h2>

        {loading ? (
          <div className="flex justify-center items-center text-white">
            <span>Loading teams...</span>
          </div>
        ) : (
          <div className="overflow-x-auto bg-[#292b38] p-6 rounded-lg shadow-lg">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-[#3a3f50] text-gray-400">
                <tr>
                  <th className="py-3 px-6">Team Name</th>
                  <th className="py-3 px-6">Members</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.uniqueCode} className="bg-[#292b38] border-b border-gray-700">
                    <td className="py-3 px-6">{team.teamName}</td>
                    <td className="py-3 px-6">{team.numMembers} members</td>
                    <td className="py-3 px-6">
                      {team.members.map((member, index) => (
                        <div key={index} className="text-xs">
                          {member.email} -{' '}
                          <span
                            className={`font-semibold ${
                              member.status === 'joined' ? 'text-green-500' : 'text-yellow-500'
                            }`}
                          >
                            {member.status === 'joined' ? 'Joined' : 'Pending'}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleViewTeam(team.uniqueCode)}
                        className="px-4 py-2 bg-[#ff5e84] text-white rounded-full hover:bg-[#ff6a92] transition duration-200"
                      >
                        View Team
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/create-team')}
            className="px-6 py-3 bg-[#ff5e84] text-white font-semibold rounded-full hover:bg-[#ff6a92] transition duration-200"
          >
            Create New Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
