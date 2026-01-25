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
        <Route
          path="/"
          element={
            authorized ? (
              <Navigate to="/dashboard/finance" replace />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="auth/*"
          element={
            !authorized ? (
              <Auth />
            ) : (
              <Navigate to="/dashboard/finance" replace />
            )
          }
        />
        <Route
          path="dashboard/*"
          element={authorized ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route path="contact/*" element={<Contact />} />
        <Route path="wishlist/*" element={<WishList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
