import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../../firebase/firebase'; // Adjust path as needed

const AddFigmaProject: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const figmaCollection = collection(db, 'figmaProjects');
      await addDoc(figmaCollection, {
        title,
        description,
        link,
      });
      setMessage('Figma project added successfully!');
      setTitle('');
      setDescription('');
      setLink('');
    } catch (error) {
      setMessage('Error adding Figma project.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d1e26]">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Add Figma Project</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold text-white mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
              placeholder="Project Title"
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
              placeholder="Project Description"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block text-lg font-semibold text-white mb-2">Figma Link</label>
            <input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
              placeholder="Figma Project Link"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-semibold bg-[#ff5e84] text-white rounded-full hover:bg-[#ff6a92] transition duration-200"
            disabled={!title || !description || !link}
          >
            Add Project
          </button>
        </form>

        {message && <p className="mt-4 text-center text-white">{message}</p>}
      </div>
    </div>
  );
};

export default AddFigmaProject;
