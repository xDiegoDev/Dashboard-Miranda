import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const { authState } = useContext(AuthContext);
  const isLoggedIn = authState.isLoggedIn;
  const userEmail = authState.userEmail;

  console.log("useAuth values:", { isLoggedIn, userEmail });

  return { isLoggedIn, userEmail };
};
