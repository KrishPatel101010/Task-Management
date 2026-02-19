import { useEffect, useState } from "react";
import type { TaskResponse } from "../../types";
import { deleteTask, getTasks } from "../../api";
import TaskForm from "./TaskForm";
import {TaskItem, Alert} from "../../components";

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
    const fetchData = async () => {
      try {
        const data = await getTasks();
        setTasks(data.Tasks);
        setError("");
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
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

      {error && <Alert type="error" message={error} />}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id}>
            <TaskItem
              task={task}
              onEdit={setTaskToEdit}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
