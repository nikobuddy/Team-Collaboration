import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../../../firebase/firebase'; // Adjust path as needed

interface Task {
  id: string;
  date: string;
  task: string;
}

const UserCalendar: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const taskCollection = collection(db, 'calendertask');
      const taskSnapshot = await getDocs(taskCollection);
      const taskList: Task[] = taskSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          date: data.date || '',
          task: data.task || '',
        };
      });
      setTasks(taskList);
    };
    fetchTasks();
  }, []);

  const handleDateSelect = (value: Date | [Date | null, Date | null] | null) => {
    if (value && !(value instanceof Array)) {
      setSelectedDate(value);
      const filteredTasks = tasks.filter(
        (task) => new Date(task.date).toDateString() === value.toDateString()
      );
      setDailyTasks(filteredTasks);
    } else {
      setSelectedDate(null);
      setDailyTasks([]);
    }
  };

  const generateColor = (index: number) => {
    const colors = ['#ff5e84', '#4caf50', '#ffc107', '#3b82f6', '#e91e63', '#673ab7'];
    return colors[index % colors.length];
  };

  const getTileStyle = (date: Date) => {
    const taskIndex = tasks.findIndex(
      (task) => new Date(task.date).toDateString() === date.toDateString()
    );
    return taskIndex !== -1 ? { backgroundColor: generateColor(taskIndex), borderRadius: '8px' } : {};
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
          tileClassName={({ date }) =>
            tasks.some((task) => new Date(task.date).toDateString() === date.toDateString())
              ? 'has-task'
              : ''
          }
          tileContent={({ date }) => {
            const style = getTileStyle(date);
            return style.backgroundColor ? <div style={style}>&nbsp;</div> : null;
          }}
          calendarType="iso8601"
        />
      </div>

      {/* Daily Task Overview */}
      <div className="bg-[#292b38] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Tasks for {selectedDate ? selectedDate.toDateString() : 'Selected Date'}
        </h2>
        {dailyTasks.length > 0 ? (
          dailyTasks.map((task, index) => (
            <div
              key={task.id}
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
