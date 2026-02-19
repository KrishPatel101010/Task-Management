import { useTasks } from "../../hooks";
import { Card, Input, Select, Alert } from "../../components";
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
      await editTask(editingId, formData);
      setEditingId(null);
    } else {
      await addNewTask(formData);
    }
    setFormData(intialState);
  };

  const handleEdit = async (id: string, data: TaskRequest) => {
    setFormData({ ...data });
    setEditingId(id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingId ? "Edit Task" : "Create Task"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <Input
            label="Title"
            value={formData.title}
            name="title"
            onChange={handleChange}
            required
          />

          <Input
            label="Description"
            value={formData.description}
            name="description"
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Status"
              value={formData.status}
              name="status"
              onChange={handleChange}
              options={[
                { value: "Pending", label: "Pending" },
                { value: "In-Progress", label: "In-Progress" },
                { value: "Completed", label: "Completed" },
              ]}
            />

            <Input
              label="Due Date"
              value={formData.dueDate}
              type="date"
              name="dueDate"
              onChange={handleChange}
            />
          </div>

          <Input
            label="User ID"
            value={formData.userId}
            name="userId"
            onChange={handleChange}
          />

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {editingId ? "Update" : "Add Task"}
            </button>
            <button
              type="button"
              className="px-4 py-2 border rounded-md text-sm"
              onClick={() => {
                setFormData(intialState);
                setEditingId(null);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </Card>

      <div>
        <h1 className="text-3xl font-bold mb-4">Task List</h1>
        {error && <Alert type="error" message={error} />}

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <ul className="space-y-3">
            {tasks?.map((task) => (
              <li
                key={task._id}
                className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Status: <span className="font-semibold">{task.status}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(task._id, task)}
                    className="text-blue-600 px-3 py-1 border rounded-md text-sm"
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => delTask(task._id)}
                    className="text-red-600 px-3 py-1 border rounded-md text-sm"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
