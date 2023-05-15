import React, { createContext, useReducer, Dispatch } from "react";

interface AuthState {
  isLoggedIn: boolean;
  userEmail: string | null;
  userName: string | null;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT" | "UPDATE_USER";
  payload?: { email: string; name: string };
}

const initialState: AuthState = {
  isLoggedIn: false,
  userEmail: null,
  userName: null,
};

const AuthContext = createContext<{
  authState: AuthState;
  authDispatch: Dispatch<AuthAction>;
}>({
  authState: initialState,
  authDispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.payload?.email || null,
        userName: action.payload?.name || null,
      };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, userEmail: null, userName: null };
    case "UPDATE_USER":
      return {
        ...state,
        userEmail: action.payload?.email || null,
        userName: action.payload?.name || null,
      };
    default:
      return state;
  }
};

const AuthProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  const value = {
    authState,
    authDispatch,
    isLoggedIn: authState.isLoggedIn,
    userEmail: authState.userEmail,
    userName: authState.userName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
