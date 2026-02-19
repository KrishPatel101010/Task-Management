import { useEffect, useState } from "react";
import type { TaskRequest, TaskResponse } from "../types";
import { getTasks, deleteTask, addTask, updateTask } from "../api";
const useTasks = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const result = await getTasks();
      setTasks(result.Tasks);
      setError("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const delTask = async (id: string) => {
    setLoading(true);
    if (!window.confirm("Are you sure?")) {
      setLoading(false);
      return;
    }
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setResponse("Task Deleted Successfully.");
      setError("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addNewTask = async (data: TaskRequest) => {
    try {
      const response = await addTask(data);
      setTasks((prev) => [...prev, response.NewTask]);
      setResponse("Task added successfully.");
      setError("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id: string, data: TaskRequest) => {
    try {
      const response = await updateTask(id, data);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.UpdatedTask : task)),
      );
      setResponse("Task updated successfully.");
      setError("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    response,
    loading,
    error,
    delTask,
    addNewTask,
    editTask,
  };
};

export default useTasks;
