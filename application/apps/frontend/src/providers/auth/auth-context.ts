import { createContext, useContext } from "react";
import { User, UserLoginPayload } from "../../types";

type AuthUser = {
  user: User | null;
  loadingUser: boolean;
  login: (payload: UserLoginPayload) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthUser | undefined>(undefined);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("Auth context must be used within Auth provider");
  return authContext;
};
