import { useEffect, useState } from "react";
import type { Task } from "../../../types/task";
import { getTasks } from "../api/taskApi";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        console.log(data.Tasks);
        setTasks(data.Tasks);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchTasks();
  }, []);
  return (
    <>
      <div>TaskList</div>
      {error && <p>{error}</p>}
      {tasks.map((task) => (
        <li key={task._id}>
          {task.title}
          {task.description}
          {task.dueDate}
          {task.status}
          {task.userId}
        </li>
      ))}
    </>
  );
};

export default TaskList;
