import React, { useEffect, useState } from 'react';
import { Commit, getCommits } from '../github/githubApi';

interface CommitHistoryProps {
  username: string;
  repo: string;
}

const CommitHistory: React.FC<CommitHistoryProps> = ({ username, repo }) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const commitData = await getCommits(username, repo);
        setCommits(commitData);
      } catch (err) {
        setError('Error fetching commit history');
        console.error(err);
      }
    };
    fetchCommits();
  }, [username, repo]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Commit History for {repo}</h2>

      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Profile</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Commit Message</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Timestamp</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Commit SHA</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {commits.map((commit) => (
                <tr key={commit.sha} className="border-b hover:bg-gray-50">
                  {/* Profile with avatar and name */}
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img
                      src={`https://github.com/${commit.commit.author.name}.png?size=40`}
                      alt={commit.commit.author.name}
                      className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                    />
                    <span className="font-medium text-gray-900">{commit.commit.author.name}</span>
                  </td>

                  {/* Commit Message */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium">{commit.commit.message}</p>
                  </td>

                  {/* Timestamp */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(commit.commit.author.date).toLocaleString()}
                  </td>

                  {/* Commit SHA (last 4 characters) */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-mono">
                    {commit.sha.slice(-4)}
                  </td>

                  {/* Actions (View Commit button) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`https://github.com/${username}/${repo}/commit/${commit.sha}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                      View Commit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommitHistory;
