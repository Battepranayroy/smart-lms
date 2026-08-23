import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ roles }) {
  const { user, token } = useSelector((state) => state.auth);

  // Not logged in → redirect to login
  if (!token || !user) return <Navigate to="/login" replace />;

  // If roles are specified → check permission
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
