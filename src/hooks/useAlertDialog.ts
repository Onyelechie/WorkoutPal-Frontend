import { useContext } from "react";
import { DialogContext } from "../components/AlertDialog/dialogContext";

/**
 * Wrapper function to create dialog context
 */
// Maybe we can use DIP to create more dialogs?
export function useAlertDialog() {
  const context = useContext(DialogContext); // this context contains a function (showAlert)
  if (!context) {
    throw new Error("useAlertDialog must be used within an AlertDialogProvider. You must wrap the App component with <AlertDialogProvider>");
  }
  return context;
}
