import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true, // Crucial: Browser handles cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for handling session expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't intercept 401s for login or logout to avoid loops
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    // If 401 and it's not a /auth/me check (which should fail silently on home)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we are already on login page, don't loop
      if (window.location.pathname === "/login") {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        return api(originalRequest);
      } catch (refreshError) {
        // Only redirect if we were actually authenticated and the refresh failed
        if (!originalRequest.url?.includes("/auth/me")) {
          window.dispatchEvent(new CustomEvent("auth-logout"));
          window.location.href = "/login?session=expired";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
