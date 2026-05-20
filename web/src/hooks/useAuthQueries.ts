import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { AuthResponse } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (credentials: any) => {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Cookies are handled by browser, we only update React state with user data
      login(data.data.user);
      toast.success("Welcome back!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
};

export const useRegister = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await api.post<AuthResponse>("/auth/register", userData);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.data.user);
      toast.success("Account created successfully!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    },
  });
};
