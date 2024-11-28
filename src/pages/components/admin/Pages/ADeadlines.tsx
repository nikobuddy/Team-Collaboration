import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../../firebase/firebase'; // Adjust path as needed

const CreateDeadline: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const deadlineCollection = collection(db, 'deadlines');
      await addDoc(deadlineCollection, {
        title,
        description,
        date,
      });
      setMessage('Deadline created successfully!');
      setTitle('');
      setDescription('');
      setDate('');
    } catch (error) {
      setMessage('Error creating deadline.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d1e26]">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Create Deadline</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold text-white mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
              placeholder="Deadline Title"
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
              placeholder="Deadline Description"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-lg font-semibold text-white mb-2">Deadline Date</label>
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
            Create Deadline
          </button>
        </form>

        {message && <p className="mt-4 text-center text-white">{message}</p>}
      </div>
    </div>
  );
};

export default CreateDeadline;
