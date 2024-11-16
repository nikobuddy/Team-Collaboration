import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase/firebase';

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const apiKeyDoc = await getDoc(doc(db, 'settings', 'githubAPIKey'));
        if (apiKeyDoc.exists()) {
          const apiKey = apiKeyDoc.data().key;

          const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
              Authorization: `token ${apiKey}`,
            },
          });

          setRepos(response.data);
          setFilteredRepos(response.data); // Initialize filtered repos
        } else {
          setError('API key not found. Please set it in the admin page.');
        }
      } catch (err) {
        setError('Failed to fetch repositories');
        console.error(err);
      }
    };

    fetchRepos();
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter repositories based on the search query
    const filtered = repos.filter((repo) =>
      repo.name.toLowerCase().includes(query)
    );
    setFilteredRepos(filtered);
  };

  return (
    <div className="p-8 bg-[#1d1e26] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">GitHub Repositories</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search repositories..."
          className="w-full p-3 rounded-lg border border-gray-600 bg-[#292b38] text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5e84]"
        />
      </div>

      {/* Repository List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <div key={repo.id} className="p-4 bg-[#292b38] shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{repo.name}</h2>
              <p className="text-gray-400">{repo.description || 'No description available'}</p>
              <Link
                to={`/repositories/${repo.id}`}
                className="block mt-4 text-[#ff5e84] font-medium hover:text-[#ff6a92] transition"
              >
                View Repository Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No repositories found</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
