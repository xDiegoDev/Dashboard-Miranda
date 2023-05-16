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
declare const AuthProvider: React.FC;
export { AuthProvider };
