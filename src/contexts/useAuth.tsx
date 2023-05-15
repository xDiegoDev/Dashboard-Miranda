import { useContext } from "react";
import { AuthContext } from "./AuthContext";

interface UseAuthReturn {
  isLoggedIn: boolean;
  userEmail: string | null;
}

export const useAuth = (): UseAuthReturn => {
  const { authState } = useContext(AuthContext);
  const isLoggedIn = authState.isLoggedIn;
  const userEmail = authState.userEmail;

  console.log("useAuth values:", { isLoggedIn, userEmail });

  return { isLoggedIn, userEmail };
};
