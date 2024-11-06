import React, { useState } from 'react';

const MainTeamSection = () => {
  const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);

  const handleCreateTeam = () => {
    // Logic for creating a team
  };

  const handleJoinTeam = () => {
    // Logic for joining a team
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1d1e26] to-[#292b38]">
      <h1 className="text-white text-3xl font-bold mb-10">Team Collaboration Platform</h1>
      
      <div className="flex space-x-10">
        {/* Create Team Card */}
        <div onClick={handleCreateTeam} className="bg-[#3a3b46] p-8 rounded-lg shadow-lg cursor-pointer hover:bg-[#4e4f5a] transition duration-200">
          <h2 className="text-white text-2xl font-semibold">Create a Team</h2>
          <p className="text-gray-400 mt-2">Start a new team and collaborate with others</p>
        </div>

        {/* Join Team Card */}
        <div onClick={handleJoinTeam} className="bg-[#3a3b46] p-8 rounded-lg shadow-lg cursor-pointer hover:bg-[#4e4f5a] transition duration-200">
          <h2 className="text-white text-2xl font-semibold">Join a Team</h2>
          <p className="text-gray-400 mt-2">Join an existing team using a team code</p>
        </div>
      </div>

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#3a3b46] p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-white text-xl font-semibold mb-4">Add Team Members</h2>
            <input
              type="email"
              placeholder="Enter member's email"
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ff5e84] mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => setAddMemberModalOpen(false)}
                className="w-full py-2 bg-[#ff5e84] text-white rounded-lg hover:bg-[#ff6a92] transition duration-200"
              >
                Add Member
              </button>
              <button
                onClick={() => setAddMemberModalOpen(false)}
                className="w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Button to Open Add Member Modal */}
      <button
        onClick={() => setAddMemberModalOpen(true)}
        className="mt-10 px-6 py-3 bg-[#ff5e84] text-white font-semibold rounded-full hover:bg-[#ff6a92] transition duration-200"
      >
        Add Team Members
      </button>
    </div>
  );
};

export default MainTeamSection;
