import { useContext } from "react";
import { AlertDialogContext } from "../components/AlertDialog/AlertDialogContext";
import type { AlertDialogContextType, ConfirmDialogContextType } from "../types/context";
import { ConfirmDialogContext } from "../components/ConfirmDialog/ConfirmDialogContext";

/**
 * Wrapper function to create dialog context
 */
export function useAlertDialog(): AlertDialogContextType {
  const context = useContext(AlertDialogContext); // this context contains a function (showAlert)
  if (!context) {
    throw new Error("useAlertDialog must be used within an AlertDialogProvider. You must wrap the App component with <AlertDialogProvider>");
  }
  return context;
}

export function useConfirmDialog(): ConfirmDialogContextType {
  const context = useContext(ConfirmDialogContext); // this context contains a function (showAlert)
  if (!context) {
    throw new Error("useAlertDialog must be used within an ConfirmDialogProvider. You must wrap the App component with <ConfirmDialogProvider>");
  }
  return context;
}
