import { useForm, useTask } from "./index";
import type { TaskRequest } from "../types";
import { useState } from "react";

const intialState: TaskRequest = {
  title: "",
  description: "",
  status: "Pending",
  dueDate: "",
  userId: "",
};
export default function useTaskForm() {
  const { formData, setFormValues, reset, handleChange } =
    useForm<TaskRequest>(intialState);
  const { tasks, response, loading, error, delTask, addNewTask, editTask } =
    useTask();
  const [editingId, setEditingId] = useState<string | null>(null);
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      await editTask(editingId, formData);
      setEditingId(null);
    } else {
      await addNewTask(formData);
    }
  };
  const handleEdit = (id: string, data: TaskRequest) => {
    setFormValues(data);
    setEditingId(id);
  };
  const handleReset = () => {
    reset();
    setEditingId(null);
  };
  return {
    formData,
    editingId,
    tasks,
    delTask,
    setFormValues,
    handleReset,
    handleChange,
    handleSubmit,
    handleEdit,
    loading,
    error,
    response,
  };
}
