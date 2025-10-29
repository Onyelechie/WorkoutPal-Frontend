// Error handler to show a alert dialog for specific messages, depending on the error status code
import type { AxiosError } from "axios";
import { useAlertDialog } from "../hooks/useAlertDialog";

export function useErrorHandler() {

    // fatal error where we can't read the status code. backend is likely down
    const FATAL_ERROR = "Something really bad happened!\nPlease contact your administrator!";

    // generic error where we receive a status code that we are currently not handling
    const GENERIC_ERROR = "Something bad happened! Please try again later.";

    // client error responses
    const ERROR_400 = "Please ensure you have valid inputs!";
    const ERROR_401 = "This content or action is only available to users who are logged in!";
    const ERROR_403 = "Please ensure you have permissions to access this content or perform this action!";
    const ERROR_404 = "We could not find what you are looking for. Sorry!";
    const ERROR_405 = "Your request is not allowed. Sorry!";

    // server error responses
    const ERROR_500 = "Something bad happened! Please try again later.";
    const ERROR_501 = "Your request is not supported. Sorry!";

    // for showing a generic alert dialog with appropriate message
    const dialogContext = useAlertDialog();

    // helper function for handling errors thrown from making an axios request
    function handleRequestError(title:string, err:AxiosError) {
        if (err?.status == 400) {
            // print the response data in case it has information. 
            // otherwise, just print the generic 400 error message.
            dialogContext.showAlert(title, err?.response ? `${err.response?.data}` : ERROR_400);
        } else if (err?.status === 401) {
            dialogContext.showAlert(title, ERROR_401);
        } else if (err?.status === 403) {
            dialogContext.showAlert(title, ERROR_403);
        } else if (err?.status === 404) {
            dialogContext.showAlert(title, ERROR_404);
        } else if (err?.status === 405) {
            dialogContext.showAlert(title, ERROR_405);
        } 
        
        else if (err?.status === 500) {
            dialogContext.showAlert(title, ERROR_500);
        } else if (err?.status === 501) {
            dialogContext.showAlert(title, ERROR_501);
        } 
        
        else if (!err.status) { // in the case where the error has no status code. this likely means that the backend is down.
            dialogContext.showAlert(title, FATAL_ERROR);
        } else { // in the case where the error is not recognized
            dialogContext.showAlert(title, GENERIC_ERROR);
        }
    }

    return {
        handleRequestError
    }
};

