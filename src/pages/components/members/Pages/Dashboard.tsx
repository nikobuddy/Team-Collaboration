import 'chart.js/auto'; // Automatically registers chart components
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

const MDashboard: React.FC = () => {
  // Mock data for demonstration; replace with actual data from props or an API
  const projectStatusData = {
    labels: ['Ongoing Projects', 'Completed Projects', 'Upcoming Projects'],
    datasets: [
      {
        label: 'Project Status',
        data: [10, 15, 5],
        backgroundColor: ['#ff5e84', '#4caf50', '#ffc107'],
        borderColor: ['#ff5e84', '#4caf50', '#ffc107'],
        borderWidth: 1,
      },
    ],
  };

  const productivityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Projects Completed',
        data: [5, 6, 8, 10, 7, 9, 11, 13, 14, 10, 8, 12],
        backgroundColor: '#4caf50',
        borderColor: '#4caf50',
        borderWidth: 1,
        fill: true,
      },
      {
        label: 'Projects Ongoing',
        data: [3, 4, 5, 4, 6, 7, 8, 7, 5, 6, 7, 8],
        backgroundColor: '#ff5e84',
        borderColor: '#ff5e84',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const taskData = [
    { title: 'Gayatri Vadge - Design and implement the Landing Page', status: 'Ongoing' },
    { title: 'Rushikesh Landge - Design and deploy a User Authentication API ', status: 'Completed' },
    { title: 'Dhanashri Sonawane - Set up the Firebase Firestore Database structure', status: 'Ongoing' },
    { title: 'Nisarga Lokhande - Test the frontend-backend integration for the User Dashboard ', status: 'Completed' },
  ];

  const recentRepos = [
    { name: 'Team Collabration', lastUpdated: '2024-11-23' },
    { name: 'Gameing App', lastUpdated: '2024-11-22' },
    { name: 'shoppers stop', lastUpdated: '2024-11-22' },
    { name: 'Study App', lastUpdated: '2024-11-22' },
  ];

  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Task Completion',
        data: [12, 19, 3, 17],
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)', // Modern gradient background
        borderWidth: 2,
        tension: 0.3, // Curve the line for a modern look
        pointBackgroundColor: '#42a5f5',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#42a5f5',
      },
    ],
  };

  return (
    <div className="p-8 bg-[#1d1e26] min-h-screen text-white space-y-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Corporate Dashboard Overview</h1>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Section */}
        <section className="bg-[#292b38] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Project Status Overview</h2>
          <div className="w-full h-64">
            <Pie
              data={projectStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' },
                },
              }}
            />
          </div>
        </section>

        {/* Productivity Analysis Section */}
        <section className="bg-[#292b38] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Productivity Analysis</h2>
          <div className="h-64">
            <Bar
              data={productivityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' },
                },
              }}
            />
          </div>
        </section>
      </div>

      {/* Key Metrics Section 
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold mb-2">Total Developers</h3>
          <p className="text-3xl font-semibold text-[#ff5e84]">50</p>
        </div>
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold mb-2">Total Designers</h3>
          <p className="text-3xl font-semibold text-[#4caf50]">20</p>
        </div>
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold mb-2">Total Users</h3>
          <p className="text-3xl font-semibold text-[#ffc107]">150</p>
        </div>
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold mb-2">Total Projects</h3>
          <p className="text-3xl font-semibold text-[#42a5f5]">200</p>
        </div>
      </section>
      

      {/* Weekly Task Completion (Line Chart) */}
      <section className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Weekly Task Completion</h2>
        <div className="h-64">
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom' },
              },
              scales: {
                x: {
                  ticks: { color: '#ffffff' },
                  grid: { color: 'rgba(255, 255, 255, 0.1)' },
                },
                y: {
                  ticks: { color: '#ffffff' },
                  grid: { color: 'rgba(255, 255, 255, 0.1)' },
                },
              },
            }}
          />
        </div>
      </section>

      {/* Task Assignment Section */}
      <section className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tasks Overview</h2>
        <ul className="space-y-2">
          {taskData.map((task, index) => (
            <li key={index} className="bg-[#1d1e26] p-4 rounded-md hover:shadow-md hover:bg-[#2a2b36] transition">
              <h4 className="font-bold text-[#ff5e84]">{task.title}</h4>
              <p className={`text-sm ${task.status === 'Ongoing' ? 'text-[#ffc107]' : task.status === 'Completed' ? 'text-[#4caf50]' : 'text-[#42a5f5]'}`}>{task.status}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent Repositories Section */}
      <section className="bg-[#292b38] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Recent Repositories</h2>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-[#1d1e26]">
              <th className="p-2">Repository Name</th>
              <th className="p-2">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {recentRepos.map((repo, index) => (
              <tr key={index} className="bg-[#1d1e26] hover:bg-[#2a2b36] transition">
                <td className="p-2">{repo.name}</td>
                <td className="p-2">{repo.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default MDashboard;
