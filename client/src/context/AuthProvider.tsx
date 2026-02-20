import type { ReactNode } from "react";
import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("auth-token")
      : null;
  });

  const login = (newToken: string) => {
    localStorage.setItem("auth-token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
