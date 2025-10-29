// Error handler to show a alert dialog for specific messages, depending on the error status code
import type { AxiosError } from "axios";
import { useAlertDialog } from "../hooks/useAlertDialog";

export function useErrorHandler() {

    const ERROR_401 = "This content or action is only available to users who are logged in!";

    const dialogContext = useAlertDialog();

    // helper function for handling errors thrown from making an axios request
    function handleRequestError(title:string, err:AxiosError) {
        if (err.status === 401) {
            dialogContext.showAlert(title, ERROR_401);
        }
    }

    return {
        handleRequestError
    }
};

