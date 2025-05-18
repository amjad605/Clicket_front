import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  bookedEvents: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  fetchUser: () => Promise<void>;
  login: (userData: User) => Promise<void>;
  logout: () => void;
  updateBookedEvents: (eventId: string) => Promise<void>; // New function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// LocalStorage keys
const USER_STORAGE_KEY = "user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAdmin = user?.isAdmin === true;

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user data", error);
        logout();
      }
    }
  }, []);

  const login = async (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = async () => {
    await fetch("https://clicket.up.railway.app/auth/logout ", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
    toast.success("Logged Out Successfully");
    setUser(null);
    setIsAuthenticated(false);

    localStorage.clear();
  };
  const fetchUser = async () => {
    try {
      const res = await fetch("https://clicket.up.railway.app/auth/me", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data);
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Fetch user error:", err);
      setUser(null);
    }
  };

  const updateBookedEvents = async (eventId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      bookedEvents: [...user.bookedEvents, eventId],
    };

    setUser(updatedUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
  };
  useEffect(() => {
    fetchUser();

    const intervalId = setInterval(fetchUser, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        fetchUser,
        updateBookedEvents,
      }}
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
