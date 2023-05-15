import React from "react";
import { useAuth } from "../contexts/useAuth.tsx";
import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoute() {
    var auth = useAuth();
    if (!auth.isLoggedIn) {
        return React.createElement(Navigate, { to: "/login" });
    }
    return React.createElement(Outlet, null);
}
export default ProtectedRoute;
