import React from "react";
import type { TaskResponse } from "../types/task";
import Button from "../components/Button";

interface TaskItemProps {
  task: TaskResponse;
  onEdit: (task: TaskResponse) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
        <p className="text-sm text-gray-600">Status: {task.status}</p>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        )}
        {task.dueDate && (
          <p className="text-sm text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex space-x-2">
        <Button type="button" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
