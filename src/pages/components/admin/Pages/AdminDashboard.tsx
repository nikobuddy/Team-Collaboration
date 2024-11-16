import 'chart.js/auto'; // Automatically registers chart components
import React from 'react';
import { Line, Pie } from 'react-chartjs-2';

const AdminDashboard: React.FC = () => {
  // Mock data for demonstration; replace with actual data as needed
  const projectStatusData = {
    labels: ['Ongoing Projects', 'Completed Projects', 'Upcoming Projects'],
    datasets: [
      {
        label: 'Project Status',
        data: [20, 30, 10], // Replace with actual data
        backgroundColor: ['#ff5e84', '#4caf50', '#ffc107'],
        borderColor: ['#ff5e84', '#4caf50', '#ffc107'],
        borderWidth: 1,
      },
    ],
  };

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Signups',
        data: [50, 75, 100, 125, 150, 175],
        fill: false,
        borderColor: '#4caf50',
        tension: 0.3,
      },
    ],
  };

  const projectWorkflowData = [
    { name: 'Project Alpha', deadline: '2024-12-01', progress: 80 },
    { name: 'Project Beta', deadline: '2024-11-20', progress: 60 },
    { name: 'Project Gamma', deadline: '2025-01-15', progress: 40 },
    { name: 'Project Delta', deadline: '2024-12-15', progress: 90 },
  ];

  const recentActivities = [
    { activity: 'User A updated Project 1', date: '2024-11-15' },
    { activity: 'User B completed Task 2', date: '2024-11-14' },
    { activity: 'User C joined the platform', date: '2024-11-13' },
  ];

  const departmentMetrics = [
    { name: 'Engineering', members: 80, projects: 15 },
    { name: 'Design', members: 30, projects: 8 },
    { name: 'Marketing', members: 25, projects: 5 },
  ];

  return (
    <div className="p-8 bg-[#1d1e26] min-h-screen text-white space-y-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Overview Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold mb-2">Total Projects</h3>
          <p className="text-4xl font-semibold text-[#ff5e84]">60</p>
        </div>
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold mb-2">Active Users</h3>
          <p className="text-4xl font-semibold text-[#4caf50]">500</p>
        </div>
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold mb-2">New Signups</h3>
          <p className="text-4xl font-semibold text-[#ffc107]">120</p>
        </div>
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold mb-2">Total Revenue</h3>
          <p className="text-4xl font-semibold text-[#ff5e84]">$150K</p>
        </div>
      </section>

      {/* Project Status Pie Chart */}
      <section className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4 text-center">Project Status Overview</h2>
        <div className="w-72 h-72">
          <Pie data={projectStatusData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>
      </section>

      {/* User Growth Line Chart */}
      <section className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Growth Over Time</h2>
        <div className="h-72">
          <Line data={userGrowthData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </section>

      {/* Recent Activities Section */}
      <section className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-2">
          {recentActivities.map((activity, index) => (
            <li key={index} className="bg-[#1d1e26] p-4 rounded-md">
              <p className="font-medium text-[#ff5e84]">{activity.activity}</p>
              <p className="text-gray-400 text-sm">{activity.date}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Department Metrics Section */}
      <section className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Department Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departmentMetrics.map((dept, index) => (
            <div key={index} className="bg-[#1d1e26] p-4 rounded-md">
              <h3 className="text-lg font-bold text-[#ff5e84]">{dept.name}</h3>
              <p className="text-gray-300">Members: {dept.members}</p>
              <p className="text-gray-300">Projects: {dept.projects}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Deadlines and Workflow Section */}
      <section className="bg-[#292b38] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Project Deadlines & Workflow</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#1d1e26]">
              <th className="p-2">Project Name</th>
              <th className="p-2">Deadline</th>
              <th className="p-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projectWorkflowData.map((project, index) => (
              <tr key={index} className="bg-[#1d1e26] hover:bg-[#2a2b36]">
                <td className="p-2">{project.name}</td>
                <td className="p-2">{project.deadline}</td>
                <td className="p-2">
                  <div className="relative w-full h-4 bg-[#292b38] rounded">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#4caf50] rounded"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1 text-gray-400">{project.progress}% completed</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
