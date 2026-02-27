import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginRequest, User } from "../types/auth";
import { authApi } from "../api/auth";
import { AuthContext } from "../contexts/AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (credentials: LoginRequest) => {
    const loginResponse = await authApi.login(credentials);
    setUser(loginResponse.user);
    navigate("/");
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
