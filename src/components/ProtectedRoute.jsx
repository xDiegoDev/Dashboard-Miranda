import React from "react";
import { useAuth } from "../contexts/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
