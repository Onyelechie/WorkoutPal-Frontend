import { createContext } from "react";
import type { AlertDialogContextType } from "../../../types/dialogContext";

export const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);
