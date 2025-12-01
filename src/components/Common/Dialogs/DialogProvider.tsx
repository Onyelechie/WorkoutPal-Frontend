import type { ReactNode } from "react";
import { AlertDialogProvider } from "./AlertDialog/AlertDialogProvider";
import { ConfirmDialogProvider } from "./ConfirmDialog/ConfirmDialogProvider";


export function DialogProvider({ children }: { children: ReactNode }) {

  return (

    <AlertDialogProvider>
      <ConfirmDialogProvider>
        {children}
      </ConfirmDialogProvider>
    </AlertDialogProvider>

  );
}