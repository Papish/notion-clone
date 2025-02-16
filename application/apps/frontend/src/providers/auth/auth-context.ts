import { createContext, useContext } from "react";
import { User } from "../../types";

type AuthUser = {
  user: User | null;
  login: (payload: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthUser | undefined>(undefined);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("Auth context must be used within Auth provider");
  return authContext;
};
