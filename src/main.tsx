import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./style/index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router";

const CLIENT_ID = import.meta.env.CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
