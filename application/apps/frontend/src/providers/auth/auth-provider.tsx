import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { User, UserLoginPayload } from "../../types";
import { httpClient, logger } from "../../utils";
import { useNavigate } from "react-router";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const navigate = useNavigate();

  const login = async (payload: UserLoginPayload) => {
    try {
      await httpClient.post("/auth/login", payload);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      const { message } = err as Error;
      logger({ type: "error", message });
    }
  };

  const logout = async () => {
    try {
      await httpClient.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("SESSION");
    }
  };

  useEffect(() => {
    const userSession = localStorage.getItem("SESSION");
    if (userSession === null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const getSession = async () => {
      setLoadingUser(true);

      try {
        const { data } = await httpClient.get("auth/me");

        localStorage.setItem("SESSION", JSON.stringify(data));

        setUser(data);
        setLoadingUser(false);
      } catch (err) {
        const { message } = err as Error;
        logger({ type: "error", message });

        localStorage.removeItem("SESSION");

        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoadingUser(false);
      }
    };

    if (isAuthenticated) {
      getSession();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
