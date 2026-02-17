import type { SignUpRequest,LoginRequest } from "../../types/auth.types";

const BASE_URL = "http://localhost:3000";

export const signUp = async (data: SignUpRequest) => {
  const response = await fetch(`${BASE_URL}/sign-up`, {
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
  const response = await fetch(`${BASE_URL}/login`, {
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
