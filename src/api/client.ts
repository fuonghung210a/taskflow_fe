import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from "axios";
import type { ErrorResponse } from "../types/error";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

class ApiClient {
  private readonly instance: AxiosInstance;
  private readonly refreshInstance: AxiosInstance;
  private refreshTokenPromise: Promise<void> | null = null;

  constructor() {
    const baseConfig = {
      baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    this.instance = axios.create(baseConfig);
    this.refreshInstance = axios.create(baseConfig);

    this.setupInterceptors();
  }

  private logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ErrorResponse>) => {
        const originalRequest = error.config;
        const responseData = error.response?.data as unknown;
        const handleLogout = () => {
          this.logout();
          globalThis.location.href = "/login";
        };

        if (error.code === AxiosError.ERR_NETWORK) {
          throw error;
        }

        if (error.response?.status === HttpStatusCode.Unauthorized) {
          const errorCode = error.
        }
      },
    );
  }
}
