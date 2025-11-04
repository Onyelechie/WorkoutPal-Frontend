// fatal error where we can't read the status code. backend is likely down
export const FATAL_ERROR =
  "Something really bad happened!\nPlease contact your administrator!";

// generic error where we receive a status code that we are currently not handling
export const GENERIC_ERROR = "Something bad happened! Please try again later.";

// client error responses
export const ERROR_400 = "Please ensure you have valid inputs!";
export const ERROR_401 =
  "This content or action is only available to users who are logged in!";
export const ERROR_403 =
  "Please ensure you have permissions to access this content or perform this action!";
export const ERROR_404 = "We could not find what you are looking for. Sorry!";
export const ERROR_405 = "Your request is not allowed. Sorry!";

// server error responses
export const ERROR_500 = "Something bad happened! Please try again later.";
export const ERROR_501 = "Your request is not supported. Sorry!";
