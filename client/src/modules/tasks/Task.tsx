import useTasks from "../../hooks/useTasks";
import { Card, Input, Select } from "../../components";
import { useState } from "react";
import type { TaskRequest } from "../../types";

const intialState: TaskRequest = {
  title: "",
  description: "",
  status: "Pending",
  dueDate: "",
  userId: "",
};
export default function Task() {
  const { tasks, loading, error, delTask, addNewTask, editTask } = useTasks();
  const [formData, setFormData] = useState<TaskRequest>(intialState);
  const [editingId, setEditingId] = useState<string | null>(null);

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
    if (editingId) {
      editTask(editingId, formData);
    } else {
      addNewTask(formData);
    }
    setFormData(intialState);
  };
  const handleEdit = async (id: string, data: TaskRequest) => {
    setFormData({ ...data });
    setEditingId(id);
  };
  return (
    <>
      <Card>
        <form onSubmit={handleSubmit} action="">
          <Input
            value={formData.title}
            name="title"
            onChange={handleChange}
          ></Input>
          <Input
            value={formData.description}
            name="description"
            onChange={handleChange}
          ></Input>
          <Select
            value={formData.status}
            name="status"
            options={[
              { value: "Pending", label: "Pending" },
              { value: "In-Progress", label: "In-Progress" },
              { value: "Completed", label: "Completed" },
            ]}
          ></Select>
          <Input
            value={formData.dueDate}
            type="date"
            name="dueDate"
            onChange={handleChange}
          ></Input>
          <Input
            value={formData.userId}
            name="userId"
            onChange={handleChange}
          ></Input>
          <button type="submit">Add</button>
        </form>
      </Card>

      <h1 className="text-5xl font-bold mt-10 mb-5">Task List</h1>
      {error && 1}
      {loading ? (
        <p>Loading</p>
      ) : (
        tasks?.map((task) => (
          <li>
            {task.title}{" "}
            <button
              onClick={() => handleEdit(task._id, task)}
              className="ring-1 mx-2"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => delTask(task._id)}
              className="ring-1"
              type="button"
            >
              Delete
            </button>{" "}
          </li>
        ))
      )}
    </>
  );
}
