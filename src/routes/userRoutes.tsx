import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/user/MainLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Category from "../pages/home/Category";
import EventsDetails from "../pages/home/EventsDetails";
import Landing from "../pages/landing/Landing";

export function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route element={<Layout />}>
        <Route path="/landing" element={<Landing />} />
        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/events/:id" element={<EventsDetails />} />
        <Route path="/users" element={<div>Users</div>} />
        <Route path="/bookings" element={<div>Bookings</div>} />
      </Route>
    </Routes>
  );
}
