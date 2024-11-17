import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Select from "react-select";
import { auth, db } from "../../../firebase/firebase";

interface Task {
  id: string;
  name: string;
  description: string;
  deadline: string;
  assignedTo: string;
  progress?: number;
}

interface User {
  id: string;
  name: string;
}

const TaskPage = ({ isAdmin }: { isAdmin: boolean }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    deadline: "",
    assignedTo: "all",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const taskQuery = isAdmin
        ? query(collection(db, "tasks"))
        : query(collection(db, "tasks"), where("assignedTo", "in", ["all", currentUserId]));
      const taskDocs = await getDocs(taskQuery);
      setTasks(taskDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task)));
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
        fetchTasks();
      }
    });
  }, [isAdmin, currentUserId]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userDocs = await getDocs(collection(db, "users"));
      setUsers(userDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User)));
    };
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const handleTaskCreate = async () => {
    const taskId = `${newTask.name}-${Date.now()}`;
    await setDoc(doc(db, "tasks", taskId), { ...newTask, createdAt: new Date() });
    setNewTask({ name: "", description: "", deadline: "", assignedTo: "all" });
    alert("Task created successfully!");
  };

  const handleProgressUpdate = async (taskId: string, newProgress: number) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { progress: newProgress });
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, progress: newProgress } : task)));
  };

  const userOptions = [
    { value: "all", label: "Assign to All Users" },
    ...users.map((user) => ({ value: user.id, label: user.name })),
  ];

  return (
    <div className="min-h-screen bg-[#1d1e26] text-white p-6">
      {isAdmin && (
        <div className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4 text-[#ff5e84]">Create Task</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task Name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-white focus:ring-[#ff5e84]"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-white focus:ring-[#ff5e84]"
            />
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white focus:ring-[#ff5e84]"
            />
            <Select
              options={userOptions}
              value={userOptions.find((option) => option.value === newTask.assignedTo)}
              onChange={(selectedOption) =>
                setNewTask({ ...newTask, assignedTo: selectedOption?.value || "all" })
              }
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white focus:ring-[#ff5e84]"
            />
            <button
              onClick={handleTaskCreate}
              className="w-full bg-[#ff5e84] text-white py-2 rounded-lg hover:bg-[#ff6a92] transition-colors"
            >
              Create Task
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-[#ff5e84]">{isAdmin ? "All Tasks" : "Your Tasks"}</h2>
      <div className="overflow-x-auto bg-[#292b38] p-6 rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="text-xs uppercase bg-[#3d3f4b]">
            <tr>
              <th className="px-6 py-3">Task Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Deadline</th>
              <th className="px-6 py-3">Assigned To</th>
              <th className="px-6 py-3">Progress</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b border-[#3d3f4b] hover:bg-[#353840]">
                <td className="px-6 py-4">{task.name}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{task.description}</td>
                <td className="px-6 py-4">{new Date(task.deadline).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  {task.assignedTo === "all" ? "All Users" : task.assignedTo}
                </td>
                <td className="px-6 py-4">
                  <div className="w-full bg-[#3d3f4b] rounded-full">
                    <div
                      className="bg-[#ff5e84] text-xs leading-none py-1 text-center text-white rounded-full"
                      style={{ width: `${task.progress || 0}%` }}
                    >
                      {task.progress || 0}%
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleProgressUpdate(task.id, Math.min((task.progress || 0) + 10, 100))}
                    className="bg-[#ff5e84] text-white px-4 py-1 rounded-md hover:bg-[#ff6a92] transition-transform transform hover:scale-105"
                  >
                    +10%
                  </button>
                  <button
                    onClick={() => handleProgressUpdate(task.id, Math.max((task.progress || 0) - 10, 0))}
                    className="bg-[#ff5e84] text-white px-4 py-1 rounded-md hover:bg-[#ff6a92] transition-transform transform hover:scale-105"
                  >
                    -10%
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskPage;