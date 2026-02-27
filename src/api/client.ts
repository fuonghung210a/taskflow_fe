import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from "axios";
import type { ErrorResponse } from "../types/error";
import { AUTH_ERROR_CODES } from "../constants/auth-error-codes";

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
        const handleLogout = () => {
          this.logout();
          globalThis.location.href = "/login";
        };

        if (error.code === AxiosError.ERR_NETWORK) {
          throw error;
        }

        if (error.response?.status === HttpStatusCode.Unauthorized) {
          const errorCode = error.code;

          if (errorCode === AUTH_ERROR_CODES.INVALID_REFRESH_TOKEN) {
            handleLogout();
            throw error;
          }

          if (errorCode === AUTH_ERROR_CODES.INVALID_CREDENTIALS) {
            throw error;
          }

          if (originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;
            this.refreshTokenPromise ??= this.refreshAccessToken();
            try {
              await this.refreshTokenPromise;
              this.refreshTokenPromise = null;
              return this.instance(originalRequest);
            } catch (refreshError) {
              this.refreshTokenPromise = null;
              handleLogout();
              throw refreshError;
            }
          }
        } else if (
          error.response?.status === HttpStatusCode.Forbidden &&
          error.response.data.code === AUTH_ERROR_CODES.FORBIDDEN
        ) {
          handleLogout();
        }

        throw error;
      },
    );
  }

  private async refreshAccessToken(): Promise<void> {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await this.refreshInstance.post("/api/auth/refresh", {
      refresh_token: refreshToken,
    });

    localStorage.setItem("access_token", response.data.access_token);
  }

  get api() {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
export default apiClient.api;
