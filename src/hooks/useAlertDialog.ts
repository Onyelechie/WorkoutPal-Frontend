import { useContext } from "react";
import { AlertDialogContext } from "../components/AlertDialog/AlertDialogContext";
import type { AlertDialogContextType } from "../types/context";

/**
 * Wrapper function to create dialog context
 */
// Maybe we can use DIP to create more dialogs?
export function useAlertDialog(): AlertDialogContextType {
  const context = useContext(AlertDialogContext); // this context contains a function (showAlert)
  if (!context) {
    throw new Error("useAlertDialog must be used within an AlertDialogProvider. You must wrap the App component with <AlertDialogProvider>");
  }
  return context;
}
