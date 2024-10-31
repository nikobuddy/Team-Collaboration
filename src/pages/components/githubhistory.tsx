import React, { useEffect, useState } from 'react';
import { Collaborator, Commit, getCollaborators, getCommits, getRepoInfo } from '../github/githubApi';

interface GitHubHistoryProps {
  username: string;
  repo: string;
}

interface RepoInfo {
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  license: { name: string } | null;
  default_branch: string;
}

const GitHubHistory: React.FC<GitHubHistoryProps> = ({ username, repo }) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commitData, collaboratorData, repoData] = await Promise.all([
          getCommits(username, repo),
          getCollaborators(username, repo),
          getRepoInfo(username, repo),
        ]);

        setCommits(commitData);
        setCollaborators(collaboratorData);
        setRepoInfo(repoData);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };
    fetchData();
  }, [username, repo]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">GitHub Repository: {repo}</h2>

      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <>
        {/* Collaborators Section */}
        <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Collaborators</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {collaborators.map((collab) => (
                <li key={collab.id} className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg">
                  <img
                    src={collab.avatar_url}
                    alt={collab.login}
                    className="w-16 h-16 rounded-full mb-2 border border-gray-200"
                  />
                  <a
                    href={collab.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {collab.login}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Repository Information Section */}
          {repoInfo && (
            <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Repository Information</h3>
              <p className="text-gray-700 mb-2">{repoInfo.description || 'No description available'}</p>
              <div className="flex flex-wrap space-x-6 text-gray-600">
                <span>🌟 Stars: {repoInfo.stargazers_count}</span>
                <span>🍴 Forks: {repoInfo.forks_count}</span>
                <span>🚀 Default Branch: {repoInfo.default_branch}</span>
                <span>📄 License: {repoInfo.license ? repoInfo.license.name : 'None'}</span>
                <span>📅 Created: {new Date(repoInfo.created_at).toLocaleDateString()}</span>
                <span>🔄 Last Updated: {new Date(repoInfo.updated_at).toLocaleDateString()}</span>
                <span>🐞 Open Issues: {repoInfo.open_issues_count}</span>
              </div>
            </div>
          )}

          {/* Commit History Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Commit History</h3>
            <ul className="bg-white shadow-lg rounded-lg p-4 divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {commits.map((commit) => (
                <li key={commit.sha} className="py-4">
                  <p className="text-gray-900 font-medium">{commit.commit.message}</p>
                  <p className="text-sm text-gray-500">
                    By {commit.commit.author.name} on {new Date(commit.commit.author.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          
        </>
      )}
    </div>
  );
};

export default GitHubHistory;
