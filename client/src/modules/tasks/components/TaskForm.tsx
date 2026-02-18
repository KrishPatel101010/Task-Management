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
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{isEditing ? "Edit Task" : "Create Task"}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
          <input
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors font-medium"
        >
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </form>

      {message && <p className="mt-4 bg-green-100 text-green-700 p-3 rounded-md">{message}</p>}
      {errorMessage && <p className="mt-4 bg-red-100 text-red-700 p-3 rounded-md">{errorMessage}</p>}
    </div>
  );
};

export default TaskForm;
