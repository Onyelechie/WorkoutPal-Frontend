import type { AxiosError } from "axios";
import { useAlertDialog } from "./useDialog";
import {
  FATAL_ERROR,
  GENERIC_ERROR,
  ERROR_400,
  ERROR_401,
  ERROR_403,
  ERROR_404,
  ERROR_405,
  ERROR_500,
  ERROR_501,
} from "../app/constants/httpErrors";
import type { ApiError } from "../types/api";

// Error handler for handling run time errors.
// Logs errors to make debugging easier.
// Ensures user gets a non-technical error message.
export function useErrorHandler() {
  // for showing a generic alert dialog with appropriate message
  const dialogContext = useAlertDialog();

  // helper function for handling errors thrown from making an axios request
  // show specific message depending on status code
  // message is optional. if there is no message, then check the error's response data based on the ApiError interface
  // otherwise, it defaults to generic error messages based on status code
  function alertOnRequestError(
    title: string,
    err: AxiosError<ApiError>,
    message?: string,
  ) {
    // log the error
    console.log(title, err);

    if (message) {
      dialogContext.showAlert(title, message);
    } else if (err.response?.data?.detail) {
      // in the case where the response has error data according to the ApiError interface
      // grab the details and print it
      dialogContext.showAlert(title, err.response?.data?.detail);
    } else {
      if (err?.status == 400) {
        dialogContext.showAlert(title, ERROR_400);
      } else if (err?.status === 401) {
        dialogContext.showAlert(title, ERROR_401);
      } else if (err?.status === 403) {
        dialogContext.showAlert(title, ERROR_403);
      } else if (err?.status === 404) {
        dialogContext.showAlert(title, ERROR_404);
      } else if (err?.status === 405) {
        dialogContext.showAlert(title, ERROR_405);
      } else if (err?.status === 500) {
        dialogContext.showAlert(title, ERROR_500);
      } else if (err?.status === 501) {
        dialogContext.showAlert(title, ERROR_501);
      } else if (!err.status) {
        // in the case where the error has no status code. this likely means that the backend is down.
        dialogContext.showAlert(title, FATAL_ERROR);
      } else {
        // in the case where the error is not recognized
        dialogContext.showAlert(title, GENERIC_ERROR);
      }
    }
  }

  // given an error, a setError and message
  // handle the actual error by logging it to console and putting a user friendly message to setError
  function handleError(
    err: any,
    setError: React.Dispatch<React.SetStateAction<Error | null>>,
    message: string,
  ) {
    console.log(message, err);
    setError(new Error(message));
  }


  return {
    alertOnRequestError,
    handleError,
  };
}
