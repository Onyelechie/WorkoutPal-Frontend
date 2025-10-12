import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import { useState } from "react";
import "./style/index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
=======
import "./index.css";
import App from "./app/App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
>>>>>>> development

const CLIENT_ID = import.meta.env.CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
