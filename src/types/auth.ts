export interface User {
  id: number;
  name: string;
  email: string;
  google_id: string;
  auth_provider: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

