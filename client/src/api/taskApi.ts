import type { TaskRequest } from "../types";

const VITE_API_URL = import.meta.env.VITE_API_URL;
export const getTasks = async (token: string) => {
  const response = await fetch(`${VITE_API_URL}/tasks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return await response.json();
};

export const addTask = async (token: string, data: TaskRequest) => {
  const response = await fetch(`${VITE_API_URL}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invaild Input");
  }
  return await response.json();
};

export const updateTask = async (
  token: string,
  id: string,
  data: TaskRequest,
) => {
  const response = await fetch(`${VITE_API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid Input");
  }
  return await response.json();
};

export const deleteTask = async (token: string, id: string) => {
  const response = await fetch(`${VITE_API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return await response.json();
};
