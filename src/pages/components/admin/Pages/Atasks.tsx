import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { db } from "../../../firebase/firebase";

interface Task {
  id: string;
  name: string;
  description: string;
  deadline: string;
  assignedTo: string; // 'all' or specific user ID
  progress: number;  // Progress field added
}

interface User {
  id: string;
  name: string;
}

const AdminTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    name: "",
    description: "",
    deadline: "",
    assignedTo: "all",
    progress: 0,  // Initialize progress to 0
  });
  const [users, setUsers] = useState<User[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null); // Track task being edited

  useEffect(() => {
    const fetchTasks = async () => {
      const taskDocs = await getDocs(collection(db, "tasks"));
      const fetchedTasks: Task[] = taskDocs.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const userDocs = await getDocs(collection(db, "users"));
      const fetchedUsers: User[] = userDocs.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<User, "id">),
      }));
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const handleTaskCreate = async () => {
    const taskId = `${newTask.name}-${Date.now()}`;
    await setDoc(doc(db, "tasks", taskId), { ...newTask, createdAt: new Date() });
    setTasks((prev) => [
      ...prev,
      { id: taskId, ...newTask },
    ]);
    setNewTask({ name: "", description: "", deadline: "", assignedTo: "all", progress: 0 });
    alert("Task created successfully!");
  };

  const handleTaskUpdate = async () => {
    if (!editTask) return;

    await updateDoc(doc(db, "tasks", editTask.id), {
      ...editTask,
    });

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editTask.id ? editTask : task
      )
    );

    setEditTask(null);
    alert("Task updated successfully!");
  };

  const handleProgressUpdate = async (taskId: string, progress: number) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { progress });
    setTasks((prev) => prev.map((task) =>
      task.id === taskId ? { ...task, progress } : task
    ));
  };

  const userOptions = [
    { value: "all", label: "Assign to All Users" },
    ...users.map((user) => ({ value: user.id, label: user.name })),
  ];

  const getUserName = (userId: string) => {
    if (userId === "all") return "All Users";
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <div className="min-h-screen bg-[#1d1e26] text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-[#ff5e84]">Admin Tasks</h2>

      {/* Task Creation Form */}
      <div className="bg-[#292b38] p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-bold mb-4 text-[#ff5e84]">Create New Task</h3>
        <div className="grid gap-4">
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
          ></textarea>
          <input
            type="date"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white focus:ring-[#ff5e84]"
          />

          {/* Modern Dropdown for Assigning Users */}
          <Select
            options={userOptions}
            onChange={(selectedOption) =>
              setNewTask({ ...newTask, assignedTo: selectedOption?.value || "all" })
            }
            placeholder="Assign Task To"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "transparent",
                borderColor: "#ff5e84",
                color: "#fff",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#292b38",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#fff",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#fff",
              }),
            }}
          />

          <button
            onClick={handleTaskCreate}
            className="w-full py-3 bg-[#ff5e84] text-white font-semibold rounded-lg hover:bg-[#ff6a92]"
          >
            Create Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-[#292b38] p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-[#ff5e84]">All Tasks</h3>
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-[#1d1e26] text-gray-400">
            <tr>
              <th className="px-6 py-3">Task Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Deadline</th>
              <th className="px-6 py-3">Assigned To</th>
              <th className="px-6 py-3">Progress</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="bg-[#292b38] border-b border-gray-600">
                <td className="px-6 py-4">{task.name}</td>
                <td className="px-6 py-4">{task.description}</td>
                <td className="px-6 py-4">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{getUserName(task.assignedTo)}</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-[#3d3f4b] rounded-full">
                    <div
                      className="bg-[#ff5e84] text-xs leading-none py-1 text-center text-white rounded-full"
                      style={{ width: `${task.progress}%` }}
                    >
                      {task.progress}%
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setEditTask(task)}
                    className="text-[#ff5e84] hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Task Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#292b38] p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4 text-[#ff5e84]">Edit Task</h3>
            <input
              type="text"
              placeholder="Task Name"
              value={editTask.name}
              onChange={(e) =>
                setEditTask((prev) => (prev ? { ...prev, name: e.target.value } : prev))
              }
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-white focus:ring-[#ff5e84] mb-4"
            />
            <textarea
              placeholder="Task Description"
              value={editTask.description}
              onChange={(e) =>
                setEditTask((prev) =>
                  prev ? { ...prev, description: e.target.value } : prev
                )
              }
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-white focus:ring-[#ff5e84] mb-4"
            ></textarea>
            <input
              type="date"
              value={editTask.deadline}
              onChange={(e) =>
                setEditTask((prev) =>
                  prev ? { ...prev, deadline: e.target.value } : prev
                )
              }
              className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white focus:ring-[#ff5e84] mb-4"
            />

            {/* Update Assigned User */}
            <Select
              options={userOptions}
              value={userOptions.find((option) => option.value === editTask.assignedTo)}
              onChange={(selectedOption) =>
                setEditTask((prev) =>
                  prev ? { ...prev, assignedTo: selectedOption?.value || "all" } : prev
                )
              }
              placeholder="Assign Task To"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "transparent",
                  borderColor: "#ff5e84",
                  color: "#fff",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#292b38",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#fff",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#fff",
                }),
              }}
            />

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setEditTask(null)}
                className="text-[#ff5e84] hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleTaskUpdate}
                className="bg-[#ff5e84] text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTasks;