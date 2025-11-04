import { useNavigate } from "react-router";

import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  ROUTINE_ROUTE,
} from "../app/AppRoutes";

/* Hook for navigating to different pages */
/* Must be a parent route */
export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    navHome: () => navigate(HOME_ROUTE),
    navProfile: () => navigate(PROFILE_ROUTE),
    navLogin: () => navigate(LOGIN_ROUTE),
    navRegister: () => navigate(REGISTER_ROUTE),
    navRoutine: () => navigate(ROUTINE_ROUTE),
  };
}
