import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';

interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userList = querySnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data(),
        })) as User[];
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSendMessage = (userId: string) => {
    navigate(`/message/${userId}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-green-200 p-8">
      <h2 className="text-4xl font-bold text-indigo-600 mb-6">Users</h2>
      {loading ? (
        <p className="text-lg text-gray-700">Loading users...</p>
      ) : (
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4">
          {users.map(user => (
            <div key={user.uid} className="flex justify-between items-center p-3 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
              <button
                className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                onClick={() => handleSendMessage(user.uid)}
              >
                Message
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
