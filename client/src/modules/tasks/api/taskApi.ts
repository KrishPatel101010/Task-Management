const VITE_API_URL = import.meta.env.VITE_API_URL;
export const getTasks = async () => {
  const response = await fetch(`${VITE_API_URL}/tasks`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  return await response.json();
};
