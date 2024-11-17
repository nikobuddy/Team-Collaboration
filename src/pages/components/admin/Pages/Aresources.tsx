import { collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../../firebase/firebase';

const AdminResources = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [accessType, setAccessType] = useState<'everyone' | 'selected'>('everyone');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [resources, setResources] = useState<any[]>([]);

  // Function to fetch resources
  const fetchResources = async () => {
    try {
      const resourcesSnapshot = await getDocs(collection(db, 'resources'));
      const resourcesData = resourcesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResources(resourcesData);
    } catch (err) {
      setError('Error fetching resources.');
    }
  };

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (err) {
      setError('Error fetching users.');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchResources();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file || !fileName.trim()) {
      setError('Please select a file and provide a resource name.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const storageRef = ref(storage, `resources/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        setError(`Upload failed: ${error.message}`);
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const resourceData = {
            fileName,
            fileURL: downloadURL,
            uploadDate: Timestamp.now(),
            accessType,
            selectedUsers,
          };

          await setDoc(doc(db, 'resources', file.name), resourceData);
          setSuccess('Resource uploaded successfully!');
          setFile(null);
          setFileName('');
          setAccessType('everyone');
          setSelectedUsers([]);
          await fetchResources(); // Refresh resources after upload
        } catch (err) {
          setError('Error saving file data to Firestore.');
        }
        setUploading(false);
      }
    );
  };

  const handleEditResource = async (resourceId: string) => {
    try {
      const resourceRef = doc(db, 'resources', resourceId);
      const resourceDoc = await getDoc(resourceRef);

      if (resourceDoc.exists()) {
        const resourceData = resourceDoc.data();
        setFileName(resourceData.fileName);
        setAccessType(resourceData.accessType);
        setSelectedUsers(resourceData.selectedUsers || []);
      } else {
        setError('Resource not found.');
      }
    } catch (err) {
      setError('Error fetching resource details.');
    }
  };

  const handleUpdateResource = async (resourceId: string) => {
    try {
      const resourceRef = doc(db, 'resources', resourceId);
      await updateDoc(resourceRef, {
        fileName,
        accessType,
        selectedUsers,
      });
      setSuccess('Resource details updated!');
      await fetchResources(); // Refresh resources after update
    } catch (err) {
      setError('Error updating resource details.');
    }
  };

  const handleUserSelection = (userId: string) => {
    setSelectedUsers(prevSelected =>
      prevSelected.includes(userId)
        ? prevSelected.filter(id => id !== userId)
        : [...prevSelected, userId]
    );
  };

  return (
    <div className="min-h-screen bg-[#1d1e26] p-8">
      <div className="bg-[#292b38] p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-white text-2xl font-bold text-center">Upload and Manage Resources</h2>

        <div className="mt-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Resource Name"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-white focus:outline-none mt-2"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full mt-2 p-2 bg-transparent border border-[#ff5e84] text-white rounded-lg focus:outline-none"
          />

          <div className="mt-4">
            <label className="text-white">Who can access this resource?</label>
            <div className="flex space-x-4 mt-2">
              <div>
                <input
                  type="radio"
                  id="everyone"
                  name="accessType"
                  checked={accessType === 'everyone'}
                  onChange={() => setAccessType('everyone')}
                  className="accent-[#ff5e84]"
                />
                <label htmlFor="everyone" className="text-white ml-2">Everyone</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="selected"
                  name="accessType"
                  checked={accessType === 'selected'}
                  onChange={() => setAccessType('selected')}
                  className="accent-[#ff5e84]"
                />
                <label htmlFor="selected" className="text-white ml-2">Selected Users</label>
              </div>
            </div>

            {accessType === 'selected' && (
              <div className="mt-4">
                <label className="text-white">Select Users:</label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {users.map((user) => (
                    <div key={user.uid} className="flex items-center">
                      <input
                        type="checkbox"
                        id={user.uid}
                        value={user.uid}
                        checked={selectedUsers.includes(user.uid)}
                        onChange={() => handleUserSelection(user.uid)}
                        className="accent-[#ff5e84]"
                      />
                      <label htmlFor={user.uid} className="text-white ml-2">{user.name || 'Unnamed User'}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full py-3 mt-4 rounded-lg text-white ${
              uploading ? 'bg-gray-400' : 'bg-[#ff5e84] hover:bg-[#ff6a92]'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Resource'}
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-white text-xl">Existing Resources</h3>
          <div className="space-y-4 mt-4">
            {resources.length === 0 ? (
              <p className="text-white">No resources available yet.</p>
            ) : (
              resources.map((resource) => (
                <div key={resource.id} className="bg-[#353b48] p-4 rounded-lg shadow-md">
                  <h4 className="text-white font-bold">{resource.fileName}</h4>
                  <p className="text-gray-300">{new Date(resource.uploadDate.seconds * 1000).toLocaleDateString()}</p>
                  <p className="text-gray-300">Access Type: {resource.accessType}</p>
                  {resource.accessType === 'selected' && (
                    <p className="text-gray-300">
                      Accessible by: {resource.selectedUsers.map(userId => {
                        const user = users.find(u => u.uid === userId);
                        return user ? user.name : userId;
                      }).join(', ')}
                    </p>
                  )}
                  <div className="mt-2">
                    <button
                      onClick={() => handleEditResource(resource.id)}
                      className="bg-[#ff5e84] text-white px-4 py-2 rounded-lg hover:bg-[#ff6a92]"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResources;
