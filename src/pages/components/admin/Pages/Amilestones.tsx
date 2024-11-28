import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../../firebase/firebase'; // Adjust path as needed

const CreateMilestone: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [achieved, setAchieved] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const milestoneCollection = collection(db, 'milestones');
      await addDoc(milestoneCollection, {
        title,
        description,
        date,
        achieved,
      });
      setMessage('Milestone created successfully!');
      setTitle('');
      setDescription('');
      setDate('');
      setAchieved(false);
    } catch (error) {
      setMessage('Error creating milestone.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d1e26]">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Create Milestone</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold text-white mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
              placeholder="Milestone Title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-lg font-semibold text-white mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
              placeholder="Milestone Description"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-lg font-semibold text-white mb-2">Target Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 font-semibold bg-[#ff5e84] text-white rounded-full hover:bg-[#ff6a92] transition duration-200"
            disabled={!title || !description || !date}
          >
            Create Milestone
          </button>
        </form>

        {message && <p className="mt-4 text-center text-white">{message}</p>}
      </div>
    </div>
  );
};

export default CreateMilestone;
