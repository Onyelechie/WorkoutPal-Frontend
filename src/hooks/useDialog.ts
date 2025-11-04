import { useContext } from "react";
import { AlertDialogContext } from "../components/Dialogs/AlertDialog/AlertDialogContext";
import type {
  AlertDialogContextType,
  ConfirmDialogContextType,
} from "../types/dialogContext";
import { ConfirmDialogContext } from "../components/Dialogs/ConfirmDialog/ConfirmDialogContext";

/**
 * Hook: A wrapper to return an AlertDialogContext
 * @returns AlertDialogContext
 */
export function useAlertDialog(): AlertDialogContextType {
  const context = useContext(AlertDialogContext); // this context contains a function (showAlert)
  if (!context) {
    throw new Error(
      "useAlertDialog must be used within an AlertDialogProvider. You must wrap the App component with <AlertDialogProvider>",
    );
  }
  return context;
}

/**
 * Hook: A wrapper to return an ConfirmDialogContext
 * @returns ConfirmDialogContext
 */
export function useConfirmDialog(): ConfirmDialogContextType {
  const context = useContext(ConfirmDialogContext); // this context contains a function (showAlert)
  if (!context) {
    throw new Error(
      "useConfirmDialog must be used within an ConfirmDialogProvider. You must wrap the App component with <ConfirmDialogProvider>",
    );
  }
  return context;
}
