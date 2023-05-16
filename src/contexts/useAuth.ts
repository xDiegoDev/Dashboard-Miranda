import { useContext } from "react";
import { AuthContext } from "./AuthContext.tsx";

interface IUseAuthReturn {
  isLoggedIn: boolean;
  userEmail: string | null;
}

export const useAuth = (): IUseAuthReturn => {
  const { authState } = useContext(AuthContext);
  const isLoggedIn = authState.isLoggedIn;
  const userEmail = authState.userEmail;

  console.log("useAuth values:", { isLoggedIn, userEmail });

  return { isLoggedIn, userEmail };
};
