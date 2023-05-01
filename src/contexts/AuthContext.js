import React, { createContext, useReducer } from "react";

const initialState = {
  isLoggedIn: false,
  userEmail: null,
  userName: null,
};

const AuthContext = createContext({
  authState: initialState,
  authDispatch: () => {},
});

export default AuthContext;

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.payload.email,
        userName: action.payload.name,
      };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, userEmail: null, userName: null };
    case "UPDATE_USER":
      return {
        ...state,
        userEmail: action.payload.email,
        userName: action.payload.name,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
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
