import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebase';

const RepositoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [repoDetails, setRepoDetails] = useState<any>(null);
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [commits, setCommits] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [releases, setReleases] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const apiKeyDoc = await getDoc(doc(db, 'settings', 'githubAPIKey'));
        if (apiKeyDoc.exists()) {
          const apiKey = apiKeyDoc.data().key;

          // Fetch repository details
          const repoResponse = await axios.get(`https://api.github.com/repositories/${id}`, {
            headers: { Authorization: `token ${apiKey}` },
          });
          setRepoDetails(repoResponse.data);

          // Fetch collaborators
          const collabResponse = await axios.get(`${repoResponse.data.url}/collaborators`, {
            headers: { Authorization: `token ${apiKey}` },
          });
          setCollaborators(collabResponse.data);

          // Fetch languages
          const langResponse = await axios.get(repoResponse.data.languages_url, {
            headers: { Authorization: `token ${apiKey}` },
          });
          setLanguages(Object.keys(langResponse.data));

          // Fetch branches
          const branchesResponse = await axios.get(`${repoResponse.data.url}/branches`, {
            headers: { Authorization: `token ${apiKey}` },
          });
          setBranches(branchesResponse.data);

          // Fetch commits
          const commitsResponse = await axios.get(`${repoResponse.data.url}/commits`, {
            headers: { Authorization: `token ${apiKey}` },
          });
          setCommits(commitsResponse.data.slice(0, 5)); // Show the latest 5 commits

          // Fetch tags
          const tagsResponse = await axios.get(`${repoResponse.data.url}/tags`, {
            headers: { Authorization: `token ${apiKey}` },
          });
          setTags(tagsResponse.data);

          // Fetch releases
          const releasesResponse = await axios.get(`${repoResponse.data.url}/releases`, {
            headers: { Authorization: `token ${apiKey}` },
          });
          setReleases(releasesResponse.data);
        } else {
          setError('API key not found. Please set it in the admin page.');
        }
      } catch (err) {
        setError('Failed to fetch repository details.');
        console.error(err);
      }
    };

    fetchRepoDetails();
  }, [id]);

  return (
    <div className="p-8 bg-[#1d1e26] min-h-screen text-white">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {repoDetails ? (
        <div className="space-y-8">
          {/* Repository Info Section */}
          <section className="bg-[#292b38] p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">{repoDetails.name}</h1>
            <p className="text-gray-400 mb-4">{repoDetails.description || 'No description available'}</p>
            <div className="flex flex-wrap space-x-4">
              <span className="bg-[#ff5e84] px-3 py-1 rounded-full text-sm">
                {repoDetails.private ? 'Private' : 'Public'}
              </span>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                Stars: {repoDetails.stargazers_count}
              </span>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                Forks: {repoDetails.forks_count}
              </span>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                Watchers: {repoDetails.watchers_count}
              </span>
            </div>
          </section>

          {/* Version Control Section */}
          <section className="bg-[#292b38] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Version Control</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Tags:</h3>
                {tags.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-300">
                    {tags.map((tag) => (
                      <li key={tag.name}>{tag.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No tags found</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold">Releases:</h3>
                {releases.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-300">
                    {releases.map((release) => (
                      <li key={release.id}>
                        <p className="font-medium">{release.name || 'Untitled Release'}</p>
                        <p className="text-sm text-gray-400">
                          Published on: {new Date(release.published_at).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No releases found</p>
                )}
              </div>
            </div>
          </section>

          {/* Existing sections for branches, collaborators, and commits */}
          {/* Branches Section */}
          <section className="bg-[#292b38] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Branches</h3>
            <ul className="list-disc list-inside space-y-2">
              {branches.map((branch) => (
                <li key={branch.name} className="text-gray-300">
                  {branch.name}
                </li>
              ))}
            </ul>
          </section>

          {/* Collaborators Section */}
          <section className="bg-[#292b38] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Collaborators</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {collaborators.length > 0 ? (
                collaborators.map((collab) => (
                  <div key={collab.id} className="flex items-center space-x-3 bg-[#1d1e26] p-3 rounded-md">
                    <img
                      src={collab.avatar_url}
                      alt={collab.login}
                      className="w-12 h-12 rounded-full border-2 border-[#ff5e84]"
                    />
                    <div>
                      <p className="font-medium text-[#ff5e84]">{collab.login}</p>
                      <a
                        href={collab.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-sm hover:underline"
                      >
                        Profile
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No collaborators found</p>
              )}
            </div>
          </section>

          {/* Commits Section */}
          <section className="bg-[#292b38] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Recent Commits</h2>
            {commits.length > 0 ? (
              <ul className="space-y-4">
                {commits.map((commit) => (
                  <li key={commit.sha} className="bg-[#1d1e26] p-4 rounded-md">
                    <p className="text-sm font-medium mb-2">
                      <span className="text-[#ff5e84]">{commit.commit.author.name}</span> committed on{' '}
                      {new Date(commit.commit.author.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400">{commit.commit.message}</p>
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 text-sm hover:underline block mt-2"
                    >
                      View Commit
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No recent commits found</p>
            )}
          </section>
        </div>
      ) : (
        <p className="text-center">Loading repository details...</p>
      )}
    </div>
  );
};

export default RepositoryDetails;
