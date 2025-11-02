import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./styles/index.css";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import TwoFactor from "./routes/TwoFactor";
import Home from "./routes/Home";

const toastOptions = {
  style: {
    borderRadius: "8px",
    padding: "12px 16px",
    fontWeight: "bold",
    border: "3px solid rgba(0, 255, 133, 0.2)",
    background:
      "linear-gradient(135deg, rgba(56, 102, 65, 0.2), rgba(0, 255, 133, 0.2))",
    color: "#e0e0e0",
  },
  iconTheme: {
    primary: "#e0e0e0",
    secondary: "rgba(56, 102, 65)",
  },
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/two-factor",
    element: <TwoFactor />,
  },
  {
    path: "/home",
    element: <Home />,
  }
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
      <Toaster position="top-center" toastOptions={toastOptions} />
      <RouterProvider router={router} />
  </StrictMode>
);
