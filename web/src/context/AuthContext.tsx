import type { User } from "@/types/auth";
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Elite approach: Hydrate user from secure cookie on load
  useEffect(() => {
    let isMounted = true;

    const fetchMe = async () => {
      // Don't auto-fetch if we're on login or register as it might just fail and loop
      const publicPaths = ["/login", "/register", "/"];
      if (publicPaths.includes(window.location.pathname) && !user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        if (isMounted && response.data.success) {
          setUser(response.data.data.user);
        }
      } catch (error) {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchMe();

    const handleLogout = () => {
      setUser(null);
    };

    window.addEventListener("auth-logout", handleLogout);
    return () => {
      isMounted = false;
      window.removeEventListener("auth-logout", handleLogout);
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    window.location.href = "/home";
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
