import { Navigate } from "react-router-dom";
import { UseAuth } from "../context/authContext";

import type { JSX } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAdmin } = UseAuth();

  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/unauthorized" />;

  return children;
};

export default AdminRoute;
