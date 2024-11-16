import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';

const ProjectAdminPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [existingKey, setExistingKey] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const docRef = doc(db, 'settings', 'githubAPIKey');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setExistingKey(docSnap.data().key);
        }
      } catch (error) {
        setMessage('Failed to fetch the API key.');
        console.error(error);
      }
    };
    fetchApiKey();
  }, []);

  const handleSaveApiKey = async () => {
    try {
      const docRef = doc(db, 'settings', 'githubAPIKey');
      if (existingKey) {
        // Update existing API key
        await updateDoc(docRef, { key: apiKey });
        setMessage('API key updated successfully.');
      } else {
        // Create new API key
        await setDoc(docRef, { key: apiKey });
        setMessage('API key saved successfully.');
      }
      setExistingKey(apiKey);
      setApiKey('');
    } catch (error) {
      setMessage('Failed to save the API key.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d1e26]">
      <div className="bg-[#292b38] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin - Manage GitHub API Key</h1>
        {existingKey ? (
          <div className="mb-4">
            <p className="text-gray-400">Current API Key (hidden for security):</p>
            <p className="text-[#ff5e84] truncate">{'*'.repeat(existingKey.length)}</p>
          </div>
        ) : (
          <p className="text-gray-400 mb-4">No API key found. Please add one.</p>
        )}

        <input
          type="text"
          placeholder="Enter your GitHub API key"
          className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e84] mb-4"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />

        <button
          onClick={handleSaveApiKey}
          className="w-full py-3 font-semibold bg-[#ff5e84] text-white rounded-full hover:bg-[#ff6a92] transition duration-200"
          disabled={!apiKey}
        >
          {existingKey ? 'Update API Key' : 'Save API Key'}
        </button>

        {message && <p className="mt-4 text-center text-white">{message}</p>}
      </div>
    </div>
  );
};

export default ProjectAdminPage;
