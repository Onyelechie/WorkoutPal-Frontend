import { createContext } from "react";
import type { ConfirmDialogContextType } from "../../../types/dialogContext";

export const ConfirmDialogContext = createContext<
  ConfirmDialogContextType | undefined
>(undefined);
