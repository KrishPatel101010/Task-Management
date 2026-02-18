import { useState } from "react";
import type { TaskRequest, TaskResponse } from "../../../types/task";
import { addTask, updateTask } from "../api/taskApi";

interface TaskFormProps {
  taskToEdit: TaskResponse | null;
  onSuccess: () => void;
}

const TaskForm = ({ taskToEdit, onSuccess }: TaskFormProps) => {
  const isEditing = Boolean(taskToEdit);

  const [formData, setFormData] = useState<TaskRequest>({
    title: taskToEdit?.title ?? "",
    description: taskToEdit?.description ?? "",
    status: taskToEdit?.status ?? "Pending",
    dueDate: taskToEdit?.dueDate ?? "",
    userId: taskToEdit?.userId ?? "",
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    try {
      if (isEditing && taskToEdit) {
        await updateTask(taskToEdit._id, formData);
        setMessage("Task updated successfully.");
      } else {
        await addTask(formData);
        setMessage("Task created successfully.");
      }

      onSuccess();

      if (!isEditing) {
        setFormData({
          title: "",
          description: "",
          status: "Pending",
          dueDate: "",
          userId: "",
        });
      }
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <>
      <h3>{isEditing ? "Edit Task" : "Create Task"}</h3>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          type="text"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label>Due Date</label>
        <input
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          type="date"
        />

        <label>User ID</label>
        <input
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          type="text"
        />

        <button type="submit">
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </form>

      {message && <p>{message}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default TaskForm;
