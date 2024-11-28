import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import axios from 'axios';
import { db } from '../../../firebase/firebase';
import { useParams } from 'react-router-dom';

interface Version {
  name: string;
  message: string;
}

const VersionList: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [error, setError] = useState('');
  const { repoId } = useParams<{ repoId: string }>();

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const apiKeyDoc = await getDoc(doc(db, 'settings', 'githubAPIKey'));
        if (apiKeyDoc.exists()) {
          const apiKey = apiKeyDoc.data().key;

          const response = await axios.get(
            `https://api.github.com/repos/your-username/${repoId}/tags`,
            {
              headers: {
                Authorization: `token ${apiKey}`,
              },
            }
          );

          setVersions(response.data);
        } else {
          setError('API key not found. Please set it in the admin page.');
        }
      } catch (err) {
        setError('Failed to fetch versions');
        console.error(err);
      }
    };

    fetchVersions();
  }, [repoId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {versions.length > 0 ? (
        versions.map((version) => (
          <div key={version.name} className="p-4 bg-[#292b38] shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{version.name}</h2>
            <p className="text-gray-400">{version.message || 'No description available'}</p>
            {isAdmin && (
              <button className="mt-2 px-4 py-2 bg-[#ff5e84] text-white rounded-lg">
                Edit Version
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center">No versions found</p>
      )}
    </div>
  );
};

export default VersionList;
