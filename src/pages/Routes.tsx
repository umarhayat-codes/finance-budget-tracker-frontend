import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./home";
import Auth from "./auth";
import Dashboard from "./dashboard";
import Contact from "./contact/Contact";
import WishList from "./wishlist/WishList";
import { useAuth } from "../redux/useReduxHook";

export default function Index() {
  const { authorized } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route
          path="auth/*"
          element={!authorized ? <Auth /> : <Navigate to="/" replace />}
        />
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route path="contact/*" element={<Contact />} />
        <Route path="wishlist/*" element={<WishList />} />
      </Routes>
    </>
  );
}
