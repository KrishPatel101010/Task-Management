import { useState } from "react";
import { Alert, Button, Card, Input, Select, Textarea } from "../../components";
import type { TaskRequest, TaskResponse } from "../../types/task";
import { addTask, updateTask } from "../../api/index";

interface TaskFormProps {
  taskToEdit: TaskResponse | null;
  onSuccess: () => void;
}

const intialState: TaskRequest = {
  title: "",
  description: "",
  status: "Pending",
  dueDate: "",
  userId: "",
};

const TaskForm = ({ taskToEdit, onSuccess }: TaskFormProps) => {
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
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, formData);
        setMessage("Task updated successfully.");
      } else {
        await addTask(formData);
        setMessage("Task created successfully.");
      }

      onSuccess();

      if (!taskToEdit) {
        setFormData(intialState);
      }
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {taskToEdit ? "Edit Task" : "Create Task"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          type="text"
          required
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "Pending", label: "Pending" },
            { value: "In-Progress", label: "In-Progress" },
            { value: "Completed", label: "Completed" },
          ]}
        />

        <Input
          label="Due Date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          type="date"
        />

        <Input
          label="User ID"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          type="text"
        />

        <Button type="submit" className="w-full">
          {taskToEdit ? "Update Task" : "Add Task"}
        </Button>
      </form>

      {message && <Alert type="success" message={message} />}
      {errorMessage && <Alert type="error" message={errorMessage} />}
    </Card>
  );
};

export default TaskForm;
