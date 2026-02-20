import { Alert, Button, Card, Input, Select } from "../../components";
import { useAuthCheck, useTaskForm } from "../../hooks";

export default function Task() {
  const {
    formData,
    tasks,
    removeTask,
    editingId,
    handleReset,
    handleChange,
    handleSubmit,
    handleEdit,
    loading,
    error,
    response,
  } = useTaskForm();
  useAuthCheck();

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
              required
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
            <Button type="submit" variant="primary" disabled={loading}>
              {editingId ? "Update" : "Add Task"}
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
          {error && <Alert type="error" message={error} />}
          {response && <Alert type="success" message={response} />}
        </form>
      </Card>

      <div>
        <h1 className="text-3xl font-bold mb-4">Task List</h1>

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
                  <Button
                    onClick={() => handleEdit(task._id, task)}
                    variant="primary"
                    type="button"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => removeTask(task._id)}
                    variant="danger"
                    type="button"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
