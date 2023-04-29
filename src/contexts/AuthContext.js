import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  isLoggedIn: false,
};
const AuthContext = createContext({
  authState: { isLoggedIn: false },
  authDispatch: () => {},
});

export default AuthContext;

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(
    authReducer,
    initialState,
    () => {
      const localData = localStorage.getItem("isLoggedIn");
      return localData ? JSON.parse(localData) : initialState;
    }
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(authState));
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
