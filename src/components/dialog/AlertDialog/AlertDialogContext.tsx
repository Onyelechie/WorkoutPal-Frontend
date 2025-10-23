import {createContext} from "react";
import type {  AlertDialogContextType } from "../contextTypes";

// "contextTypes.ts"
    // type AlertDialogContextType = {
    //   showAlert: (title: string, message: string) => void;
    // };

// allow the function (showAlert) to be called anywhere as long as the children component is wrapped by <AlertDialogProvider>
//     Example:  const context = useContext(AlertDialogContext);
//     context.showAlert()
export const AlertDialogContext =  createContext<AlertDialogContextType | undefined>(undefined);
