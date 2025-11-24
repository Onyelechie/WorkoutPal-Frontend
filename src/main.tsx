import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./app/App.tsx";
import { DialogProvider } from "./components/Common/Dialogs/DialogProvider.tsx";

// For Google OAuth stretch goal
// import { GoogleOAuthProvider } from "@react-oauth/google";
// const CLIENT_ID = import.meta.env.CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </StrictMode>,
);
