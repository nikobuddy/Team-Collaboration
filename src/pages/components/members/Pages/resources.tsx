import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase'; // Assuming Firebase is initialized
import { getDocs, collection } from 'firebase/firestore';

const UserResources = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    // Fetch resources based on the current user’s access level
    const fetchResources = async () => {
      try {
        const resourcesSnapshot = await getDocs(collection(db, 'resources'));
        const resourcesData = resourcesSnapshot.docs.map((doc) => doc.data());
        
        // Filter resources based on user’s access
        // Assuming user is stored in state or context, replace with actual user data
        const currentUser = { uid: 'user123' }; // Example user data, replace with real data
        
        const accessibleResources = resourcesData.filter((resource: any) => {
          return (
            resource.accessType === 'everyone' || 
            resource.selectedUsers.includes(currentUser.uid)
          );
        });

        setResources(accessibleResources);
      } catch (err) {
        setError('Failed to fetch resources');
      }
    };

    fetchResources();
  }, []);

  const handleDownload = (fileURL: string) => {
    window.open(fileURL, '_blank'); // Opens the file in a new tab
  };

  return (
    <div className="min-h-screen bg-[#1d1e26] p-8">
      <div className="bg-[#292b38] p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-white text-2xl font-bold text-center">Resources</h2>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}

        <div className="mt-6">
          {resources.length === 0 ? (
            <p className="text-white">No resources available.</p>
          ) : (
            resources.map((resource, index) => (
              <div key={index} className="bg-[#353b48] p-4 rounded-lg shadow-md mb-4">
                <h4 className="text-white font-semibold">{resource.fileName}</h4>
                <p className="text-gray-300">Uploaded on: {new Date(resource.uploadDate.seconds * 1000).toLocaleDateString()}</p>
                <p className="text-gray-300">Access: {resource.accessType === 'everyone' ? 'Everyone' : 'Restricted'}</p>
                
                {/* Accessible users list for restricted access */}
                {resource.accessType === 'selected' && (
                  <p className="text-gray-300">
                    Accessible by: {resource.selectedUsers.join(', ')}
                  </p>
                )}

                <div className="mt-2">
                  <button
                    onClick={() => handleDownload(resource.fileURL)}
                    className="bg-[#ff5e84] text-white px-4 py-2 rounded-lg hover:bg-[#ff6a92] transition"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserResources;