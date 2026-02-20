import { useCallback, useEffect, useState } from "react";
import type { TaskRequest, TaskResponse } from "../types";
import { getTasks, deleteTask, addTask, updateTask } from "../api";
import { useAuthContext } from "../context/AuthContext";
const useTasks = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuthContext();
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      if (!token) return;
      const result = await getTasks(token);
      setTasks(result.Tasks);
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setResponse("");
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const removeTask = async (id: string) => {
    setLoading(true);
    if (!window.confirm("Are you sure?")) {
      setLoading(false);
      return;
    }
    try {
      if (!token) return;
      await deleteTask(token, id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setResponse("Task Deleted Successfully.");
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setResponse("");
    } finally {
      setLoading(false);
    }
  };

  const addNewTask = async (data: TaskRequest) => {
    try {
      if (!token) return;
      const response = await addTask(token, data);
      setTasks((prev) => [...prev, response.NewTask]);
      setResponse("Task added successfully.");
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setResponse("");
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id: string, data: TaskRequest) => {
    try {
      if (!token) return;
      const response = await updateTask(token, id, data);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.UpdatedTask : task)),
      );
      setResponse("Task updated successfully.");
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setResponse("");
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    response,
    loading,
    error,
    removeTask,
    addNewTask,
    editTask,
  };
};

export default useTasks;
