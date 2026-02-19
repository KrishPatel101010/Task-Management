import type { SignUpRequest, LoginRequest } from "../types/auth";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const signUp = async (data: SignUpRequest) => {
  const response = await fetch(`${VITE_API_URL}/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Signup failed");
  }

  return await response.json();
};

export const login = async (data: LoginRequest) => {
  const response = await fetch(`${VITE_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed");
  }

  return await response.json();
};
