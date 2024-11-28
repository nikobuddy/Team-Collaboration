import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase'; // Adjust path

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  achieved: boolean;
}

const Milestoness: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    const fetchMilestones = async () => {
      const snapshot = await getDocs(collection(db, 'milestones'));
      const fetchedMilestones: Milestone[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Milestone[];
      setMilestones(fetchedMilestones);
    };

    fetchMilestones();
  }, []);

  const calculateCountdown = (targetDate: string) => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const timeLeft = target - now;

    if (timeLeft <= 0) {
      return 'Expired';
    }

    const days = Math.floor(timeLeft / (1000 * 3600 * 24));
    const hours = Math.floor((timeLeft % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeLeft % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-[#1d1e26] text-white p-8">
      <h1 className="text-3xl font-semibold text-center mb-8 text-[#ff5e84]">Milestones</h1>

      {/* Milestone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`p-6 rounded-2xl shadow-xl transition duration-300 transform hover:scale-105 ${
              milestone.achieved ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-[#292b38] hover:bg-[#3d404c]'
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">{milestone.title}</h2>
            <p className="text-gray-400 mb-4">{milestone.description}</p>

            <div className="flex justify-between items-center mb-4">
              <p
                className={`text-sm ${milestone.achieved ? 'text-gray-200' : 'text-blue-500'}`}
              >
                {milestone.achieved ? 'Achieved' : `Target Date: ${new Date(milestone.date).toDateString()}`}
              </p>

              {/* Status Indicator */}
              <span
                className={`w-3 h-3 rounded-full ${
                  milestone.achieved ? 'bg-green-500' : 'bg-blue-500'
                }`}
              ></span>
            </div>

            {/* Countdown Timer for Pending Milestones */}
            {!milestone.achieved && (
              <div className="text-center">
                <p className="text-lg font-semibold text-[#ff5e84] mb-2">Time Left</p>
                <p className="text-lg font-semibold text-yellow-400">
                  {calculateCountdown(milestone.date)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Milestoness;
