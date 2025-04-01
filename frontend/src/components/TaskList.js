import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = ({ chatId }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get(`/api/tasks/${chatId}`).then((res) => setTasks(res.data));
  }, [chatId]);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const { data } = await axios.post(`/api/tasks/${chatId}`, { task: newTask });
    setTasks([...tasks, data]);
    setNewTask("");
  };

  const toggleTask = async (taskId, completed) => {
    const { data } = await axios.put(`/api/tasks/${taskId}`, { completed: !completed });
    setTasks(tasks.map((task) => (task._id === taskId ? data : task)));
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold">To-Do List</h3>
      <div className="flex mt-2">
        <input type="text" className="flex-1 p-2 border rounded" placeholder="New task..."
          value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button className="bg-black text-white p-2 ml-2 rounded" onClick={addTask}>Add</button>
      </div>
      <ul className="mt-3">
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center p-2 border-b">
            <span className={`${task.completed ? "line-through text-gray-500" : ""}`}>{task.task}</span>
            <div>
              <button className="text-sm text-green-600 mr-2" onClick={() => toggleTask(task._id, task.completed)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button className="text-sm text-red-600" onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
