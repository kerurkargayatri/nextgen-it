
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Admin from "./Admin.jsx";
import "./index.css";

const path = window.location.pathname.replace(/\/+$/, "");

const isAdmin =
  path === "/nextgen-it/admin" ||
  path === "/admin";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdmin ? <Admin /> : <App />}
  </React.StrictMode>
);
