import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';

interface Member {
  email: string;
  status: 'accepted' | 'pending';
}

const TeamDashboard = () => {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [leaderEmail, setLeaderEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        
        if (userData?.teamCreated && userData?.role === 'leader') {
          const teamDoc = await getDoc(doc(db, 'teams', userData.teamName));
          const teamData = teamDoc.data();
          
          if (teamData) {
            setTeamName(teamData.teamName);
            setLeaderEmail(user.email || '');
            
            // Fetching members with status
            const membersQuery = query(
              collection(db, 'invitations'),
              where('teamId', '==', teamData.teamName)
            );
            const memberDocs = await getDocs(membersQuery);
            const memberList = memberDocs.docs.map(doc => ({
              email: doc.data().memberEmail,
              status: doc.data().status,
            }));
            setMembers(memberList);
          }
        } else {
          navigate('/');
        }
      } else {
        navigate('/login');
      }
    };

    fetchTeamData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#1d1e26] flex items-center justify-center">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-3xl w-full space-y-6">
        <h2 className="text-white text-3xl font-bold text-center">Team Dashboard</h2>
        
        <div className="text-center text-white">
          <h3 className="text-xl font-semibold">{teamName}</h3>
          <p className="text-sm text-gray-400">Led by: {leaderEmail}</p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg text-white font-semibold">Team Members</h4>
          
          <ul className="space-y-2">
            {members.map((member, index) => (
              <li
                key={index}
                className={`p-3 rounded-lg text-white text-sm flex justify-between items-center ${
                  member.status === 'accepted' ? 'bg-[#3a3f50]' : 'bg-[#2e2e2e]'
                }`}
              >
                <span>{member.email}</span>
                <span
                  className={`${
                    member.status === 'accepted'
                      ? 'text-green-400'
                      : 'text-yellow-400'
                  } text-xs`}
                >
                  {member.status === 'accepted' ? 'Accepted' : 'Pending'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full py-3 bg-[#ff5e84] text-white font-semibold rounded-full hover:bg-[#ff6a92] transition duration-200">
          Manage Team
        </button>
      </div>
    </div>
  );
};

export default TeamDashboard;
