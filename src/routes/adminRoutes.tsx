import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/admin/Layout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

export function AdminRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
