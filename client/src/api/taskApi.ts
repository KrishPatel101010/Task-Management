import type { TaskRequest } from "../types/index";

const VITE_API_URL = import.meta.env.VITE_API_URL;
export const getTasks = async () => {
  const response = await fetch(`${VITE_API_URL}/tasks`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return await response.json();
};

export const addTask = async (data: TaskRequest) => {
  const response = await fetch(`${VITE_API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invaild Input");
  }
  return await response.json();
};

export const updateTask = async (id: string, data: TaskRequest) => {
  const response = await fetch(`${VITE_API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid Input");
  }
  return await response.json();
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`${VITE_API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return await response.json();
};
