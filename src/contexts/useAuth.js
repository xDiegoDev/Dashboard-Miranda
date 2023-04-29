import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const { authState } = useContext(AuthContext);
  return authState;
};
