import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase'; // Adjust path as needed

interface FigmaProject {
  id: string;
  title: string;
  description: string;
  link: string;
}

const FigmaProjects: React.FC = () => {
  const [projects, setProjects] = useState<FigmaProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const figmaCollection = collection(db, 'figmaProjects');
        const figmaSnapshot = await getDocs(figmaCollection);
        const projectList: FigmaProject[] = figmaSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FigmaProject[];
        setProjects(projectList);
      } catch (error) {
        console.error('Error fetching Figma projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#1d1e26] p-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Figma Projects</h1>
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#292b38] p-6 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-[#ff5e84] mb-2">{project.title}</h2>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4caf50] underline hover:text-[#5cff6b]"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No Figma projects found.</p>
      )}
    </div>
  );
};

export default FigmaProjects;
