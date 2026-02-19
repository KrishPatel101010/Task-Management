import { useEffect, useState } from "react";
import type { TaskResponse } from "../types";
import { getTasks } from "../api";
const useTasks = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const result = await getTasks();
        setTasks(result.Tasks);
        setError("");
      } catch (err) {
        setError((err as Error).message);
      }
      finally{
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error
  };
};

export default useTasks;
