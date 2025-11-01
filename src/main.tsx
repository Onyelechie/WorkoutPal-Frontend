import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./app/App.tsx";
import { AlertDialogProvider } from "./components/Dialog/AlertDialog/AlertDialogProvider.tsx";
import { ConfirmDialogProvider } from "./components/Dialog/ConfirmDialog/ConfirmDialogProvider.tsx";

// For Google OAuth stretch goal 
// import { GoogleOAuthProvider } from "@react-oauth/google";
// const CLIENT_ID = import.meta.env.CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertDialogProvider>
      {/* Provider nesting problem. Refactor soon? */}
      <ConfirmDialogProvider>
        <App />
      </ConfirmDialogProvider>
    </AlertDialogProvider>
  </StrictMode>
);
