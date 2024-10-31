// githubApi.ts
import axios, { AxiosInstance } from 'axios';

// Define interfaces for GitHub data responses
export interface Commit {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  author: {
    login: string;
  };
}

export interface Collaborator {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

// Set up the axios instance
const token = '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';
const api: AxiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${token}`,
  },
});

// Define API function to get commits
export const getCommits = async (username: string, repo: string): Promise<Commit[]> => {
  const response = await api.get<Commit[]>(`/repos/${username}/${repo}/commits`);
  return response.data;
};

// Define API function to get collaborators
export const getCollaborators = async (username: string, repo: string): Promise<Collaborator[]> => {
  const response = await api.get<Collaborator[]>(`/repos/${username}/${repo}/collaborators`);
  return response.data;
};

// Add additional API functions as needed, following the same pattern
export const getRepoInfo = async (username: string, repo: string) => {
    const response = await api.get(`/repos/${username}/${repo}`);
    return response.data;
  };