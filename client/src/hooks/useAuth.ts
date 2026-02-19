import { useState } from "react";
import { login, signUp } from "../api";
import type { LoginRequest, SignUpRequest } from "../types";

export default function useAuth() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userSignUp = async (data: SignUpRequest) => {
    setLoading(true);
    try {
      const response = await signUp(data);
      setResponse(response.message);
      setError("");
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const userLogin = async (data: LoginRequest) => {
    setLoading(true);
    try {
      const response = await login(data);
      setResponse(response.message);
      setError("");
      return response;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    loading,
    error,
    userSignUp,
    userLogin,
  };
}
