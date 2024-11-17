import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../../../firebase/firebase'; // Adjust path as needed

const UserCalendar: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dailyTasks, setDailyTasks] = useState<any[]>([]);

  useEffect(() => {
    // Fetch tasks from the "calendertask" collection in Firebase to display
    const fetchTasks = async () => {
      const taskCollection = collection(db, 'calendertask');
      const taskSnapshot = await getDocs(taskCollection);
      const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
    };
    fetchTasks();
  }, []);

  const handleDateSelect = (value: Date) => {
    setSelectedDate(value);
    const filteredTasks = tasks.filter(
      (task) => new Date(task.date).toDateString() === value.toDateString()
    );
    setDailyTasks(filteredTasks);
  };

  // Generate random colors for tasks
  const generateColor = (index: number) => {
    const colors = ['#ff5e84', '#4caf50', '#ffc107', '#3b82f6', '#e91e63', '#673ab7'];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-[#1d1e26] p-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">User Task Calendar</h1>

      {/* Calendar View */}
      <div className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-8">
        <Calendar
          onChange={handleDateSelect}
          value={selectedDate}
          className="bg-[#1d1e26] text-white rounded-md"
          tileClassName={({ date }) => {
            const hasTask = tasks.some(
              (task) => new Date(task.date).toDateString() === date.toDateString()
            );
            return hasTask ? 'bg-[#ff5e84] rounded-md text-white' : '';
          }}
          calendarType="iso8601"
        />
      </div>

      {/* Daily Task Overview */}
      <div className="bg-[#292b38] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Tasks for {selectedDate ? selectedDate.toDateString() : 'Selected Date'}</h2>
        {dailyTasks.length > 0 ? (
          dailyTasks.map((task, index) => (
            <div
              key={index}
              className="p-4 mb-2 rounded-md"
              style={{ backgroundColor: generateColor(index) }}
            >
              <p className="font-semibold">{task.task}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No tasks for this date.</p>
        )}
      </div>
    </div>
  );
};

export default UserCalendar;
