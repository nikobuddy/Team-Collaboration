import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, Title, Tooltip } from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { useTable } from 'react-table';
import { db } from '../../../firebase/firebase';

// Register necessary chart components
ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, CategoryScale, LinearScale);

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  signupDate: string;
}

interface Task {
  id: string;
  name: string;
  assignedTo: string;
  progress: number;
}

const TaskDahboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userStats, setUserStats] = useState<Map<string, { total: number; completed: number; averageProgress: number }>>(new Map());

  useEffect(() => {
    const fetchUsers = async () => {
      const userDocs = await getDocs(collection(db, 'users'));
      setUsers(userDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User)));
    };

    const fetchTasks = async () => {
      const taskDocs = await getDocs(collection(db, 'tasks'));
      setTasks(taskDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task)));
    };

    fetchUsers();
    fetchTasks();
  }, []);

  useEffect(() => {
    const stats: Map<string, { total: number; completed: number; averageProgress: number }> = new Map();

    users.forEach((user) => {
      const userTasks = tasks.filter((task) => task.assignedTo === user.id || task.assignedTo === 'all');
      const totalTasks = userTasks.length;
      const completedTasks = userTasks.filter((task) => task.progress === 100).length;
      const averageProgress = totalTasks > 0 ? userTasks.reduce((acc, task) => acc + task.progress, 0) / totalTasks : 0;

      stats.set(user.id, {
        total: totalTasks,
        completed: completedTasks,
        averageProgress: averageProgress,
      });
    });

    setUserStats(stats);
  }, [users, tasks]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'User Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Signup Date',
        accessor: 'signupDate',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: users });

  const getPieChartData = (stats: { total: number; completed: number; averageProgress: number }) => ({
    labels: ['Completed', 'Pending', 'Average Progress'],
    datasets: [
      {
        data: [stats.completed, stats.total - stats.completed, stats.averageProgress],
        backgroundColor: ['#4caf50', '#ffeb3b', '#ff5e84'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  });

  const getLineChartData = () => {
    const labels = users.map((user) => user.name);
    const signupDates = users.map((user) => new Date(user.signupDate).getTime());
    return {
      labels,
      datasets: [
        {
          label: 'Signup Date',
          data: signupDates,
          borderColor: '#ff5e84',
          fill: false,
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-[#1d1e26] text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#ff5e84]">Admin Dashboard - User Overview</h2>

      {/* User Table */}
      <div className="overflow-x-auto bg-[#292b38] p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-bold text-[#ff5e84] mb-4">Registered Users</h3>
        <table {...getTableProps()} className="min-w-full table-auto">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="px-6 py-3 text-left text-sm font-medium text-gray-400 border-b">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="odd:bg-[#333544] even:bg-[#292b38]">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="px-6 py-3 text-sm text-gray-300 border-b">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Line Chart */}
      <div className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-bold text-[#ff5e84] mb-4">User Signup Period</h3>
        <Line data={getLineChartData()} options={{ responsive: true }} />
      </div>

      {/* User Task Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => {
          const stats = userStats.get(user.id);
          return stats ? (
            <div key={user.id} className="bg-[#292b38] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#ff5e84] mb-4">{user.name}</h3>
              <Pie data={getPieChartData(stats)} options={{ responsive: true }} />
              <div className="mt-4">
                <p className="text-sm text-gray-400">Total Tasks: {stats.total}</p>
                <p className="text-sm text-gray-400">Completed Tasks: {stats.completed}</p>
                <p className="text-sm text-gray-400">Average Progress: {stats.averageProgress.toFixed(2)}%</p>
              </div>
            </div>
          ) : (
            <div key={user.id} className="bg-[#292b38] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#ff5e84] mb-4">Loading...</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskDahboard;