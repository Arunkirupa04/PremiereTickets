import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated =
    localStorage.getItem("isAdminAuthenticated") === "true";
  const isAdmin = localStorage.getItem("userRole") === "admin";

  if (!isAuthenticated || !isAdmin) {
    // Redirect to the login page, while preserving the intended navigation path
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Render children routes that are nested within this route component
  return <Outlet />;
};

export default ProtectedRoute;
