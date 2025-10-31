import { createContext } from "react";
import type { ConfirmDialogContextType } from "../../types/context";


export const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);
