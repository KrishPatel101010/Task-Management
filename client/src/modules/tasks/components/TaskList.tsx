import { useEffect, useState } from "react";
import type { TaskResponse } from "../../../types/task";
import { getTasks } from "../api/taskApi";
import TaskForm from "./TaskForm";
const TaskList = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
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
      <TaskForm></TaskForm>
      
    </>
  );
};

export default TaskList;
