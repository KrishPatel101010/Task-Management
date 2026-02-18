import { useEffect, useState } from "react";
import type { TaskResponse } from "../../../types/task";
import { deleteTask, getTasks } from "../api/taskApi";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [error, setError] = useState("");
  const [taskToEdit, setTaskToEdit] = useState<TaskResponse | null>(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.Tasks);
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const data = await getTasks();
        if (!ignore) {
          setTasks(data.Tasks);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError((err as Error).message);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <TaskForm
        key={taskToEdit?._id || "new"}
        taskToEdit={taskToEdit}
        onSuccess={() => {
          fetchTasks();
          setTaskToEdit(null);
        }}
      />

      <div className="border-t border-gray-300"></div>
      <h3 className="text-2xl font-bold text-gray-800">Task List</h3>

      {error && (
        <p className="bg-red-100 text-red-700 p-4 rounded-md">{error}</p>
      )}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {task.title}
              </h4>
              <p className="text-sm text-gray-600">Status: {task.status}</p>
              {task.description && (
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
              )}
              {task.dueDate && (
                <p className="text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setTaskToEdit(task)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
