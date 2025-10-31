import { createContext } from "react";
import type { AlertDialogContextType } from "../../types/context";


export const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);
