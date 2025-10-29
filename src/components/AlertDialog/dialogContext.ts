import { createContext } from "react";
import type { DialogContextType } from "../../types/context";

// https://www.youtube.com/watch?v=HYKDUF8X3qI
export const DialogContext = createContext<DialogContextType | undefined>(undefined);

