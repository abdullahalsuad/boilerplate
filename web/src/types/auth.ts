export interface User {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  role: "USER" | "ADMIN";
  is_active: boolean;
  is_verified: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthData {
  user: User;
  tokens: Tokens;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  message?: string;
}

export interface AuthResponse extends ApiResponse<AuthData> {}
