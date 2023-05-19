import React, { Dispatch } from "react";
interface AuthState {
    isLoggedIn: boolean;
    userEmail: string | null;
    userName: string | null;
}
interface AuthAction {
    type: "LOGIN" | "LOGOUT" | "UPDATE_USER";
    payload?: {
        email: string;
        name: string;
    };
}
export declare const AuthContext: React.Context<{
    authState: AuthState;
    authDispatch: Dispatch<AuthAction>;
}>;
type AuthProviderProps = {
    children: React.ReactNode;
};
declare const AuthProvider: React.FC<AuthProviderProps>;
export { AuthProvider };
