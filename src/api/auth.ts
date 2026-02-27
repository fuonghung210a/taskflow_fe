import api from "./client";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/api/auth/login",
      {},
      {
        auth: {
          username: credentials.email,
          password: credentials.password,
        },
      },
    );

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      const endpoint = localStorage.getItem("endpoint");
      await api.post("/api/auth/logout", {
        endpoint: endpoint,
      });
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("endpoint");
    }
  },
};
