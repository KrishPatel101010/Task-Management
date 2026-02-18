import { useState } from "react";
import type { TaskRequest } from "../../../types/task";
import { addTask } from "../api/taskApi";

const TaskForm = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<TaskRequest>({
    title: "",
    description: "",
    status: "",
    dueDate: "",
    userId: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await addTask(formData);
      setMessage(response.Message);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title : </label>
        <input onChange={handleChange} type="text" name="title" />
        <br />

        <label htmlFor="description">Description : </label>
        <textarea onChange={handleChange} name="description"></textarea>
        <br />

        <label htmlFor="status">Status : </label>
        <select onChange={handleChange} name="status">
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <br />

        <label htmlFor="dueDate">DueDate : </label>
        <input onChange={handleChange} type="date" name="dueDate" />
        <br />

        <label htmlFor="userId">UserID : </label>
        <input onChange={handleChange} type="text" name="userId" />
        <br />
        <button type="submit">Add Task</button>
      </form>
      {message ? <p>{message}</p> : <p>{errorMessage}</p>}
    </>
  );
};

export default TaskForm;
