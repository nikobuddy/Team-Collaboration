import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../../../firebase/firebase'; // Adjust path as needed

const AdminCalendar: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<[Date, Date] | null>(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskCollection = collection(db, 'calendertask');
        const taskSnapshot = await getDocs(taskCollection);
        const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(taskList);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        alert('Failed to fetch tasks.');
      }
    };
    fetchTasks();
  }, []);

  const handleDateChange = (value: Date | [Date | null, Date | null] | null) => {
    if (Array.isArray(value) && value[0] && value[1]) {
      setSelectedDateRange([value[0], value[1]]);
    } else {
      setSelectedDateRange(null);
    }
  };

  const handleAddTask = async () => {
    if (selectedDateRange && taskDescription) {
      const [startDate, endDate] = selectedDateRange;
      try {
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          await setDoc(doc(db, 'calendertask', currentDate.toISOString().replace(/:/g, '-')), {
            date: currentDate.toISOString(),
            task: taskDescription,
            assignedTo: 'UserX', // Replace with actual user info if needed
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
        alert('Task successfully added!');
        setTaskDescription('');
        setSelectedDateRange(null);
      } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task. Check the console for more details.');
      }
    } else {
      alert('Please select a date range and enter a task.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1d1e26] p-6 text-white space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Task Calendar</h1>

      {/* Calendar and Task Input */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Select Date Range</h2>
          <Calendar
            onChange={handleDateChange}
            selectRange={true}
            value={selectedDateRange}
            className="bg-[#1d1e26] text-white rounded-md"
            tileClassName="hover:bg-[#3a3b48] rounded-md"
            calendarType="iso8601"
          />
        </div>
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full p-3 bg-[#1d1e26] border border-[#3a3b48] rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
            placeholder="Enter task description..."
          />
          <button
            onClick={handleAddTask}
            className="w-full py-3 bg-gradient-to-r from-[#ff5e84] to-[#ff6a92] rounded-md text-white hover:from-[#ff4a70] hover:to-[#ff5e84] transition font-semibold"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Display Tasks */}
      <div className="bg-[#292b38] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="mb-2">
                {task.date}: {task.task}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCalendar;
