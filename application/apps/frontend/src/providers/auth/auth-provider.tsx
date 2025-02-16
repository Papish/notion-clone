import { useState } from "react";
import { AuthContext } from "./auth-context";
import { User } from "../../types";
import { httpClient } from "../../utils";
import { useNavigate } from "react-router";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (payload: User) => {
    setUser(payload);
  };

  const logout = async () => {
    try {
      await httpClient.post("/auth/logout");
      setUser(null)
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
