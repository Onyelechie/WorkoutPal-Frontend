import { Routes, Route, Navigate } from "react-router";
import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";

import ProfilePage from "../pages/Profile/ProfilePage";
import OtherUserPage from "../pages/Profile/OtherUserPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import RoutinePage from "../pages/Routine/RoutinePage";
import RoutineBuilder from "../components/Workouts/Routines/RoutineBuilder/RoutineBuilder";
import RoutineScheduler from "../components/Workouts/Routines/RoutineScheduler/RoutineScheduler";

export const LOGIN_ROUTE = "/auth/login";
export const REGISTER_ROUTE = "/auth/register";
export const HOME_ROUTE = "/home";
export const PROFILE_ROUTE = "/profile";

// routine routes
export const ROUTINE_ROUTE = "/routine"; // parent route
export const BUILDER_ROUTE = "builder"; // relative child route
export const SCHEDULER_ROUTE = "scheduler"; // relative child route

export default function AppRoutes() {
  return (
    <>
      {/* All routes in the app */}
      {/* Inspired from https://www.w3schools.com/react/react_router.asp */}
      <Routes>
        {/* Redirect path '/' to the login. Redirection code retrieved from ChatGPT */}
        <Route path="/" element={<Navigate to={LOGIN_ROUTE} replace />} />

        {/* "/*" indicates that it is a parent route */}

        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={REGISTER_ROUTE} element={<RegisterPage />} />

        <Route path={HOME_ROUTE} element={<HomePage />} />
        <Route path={PROFILE_ROUTE} element={<ProfilePage />} />
        <Route path="/users/:id" element={<OtherUserPage />} />

        <Route path={ROUTINE_ROUTE} element={<RoutinePage />}>
          {/* Redirect to the scheduler on ROUTINE_ROUTE */}
          <Route index element={<Navigate to={SCHEDULER_ROUTE} replace />} />

          <Route path={BUILDER_ROUTE} element={<RoutineBuilder />} />
          <Route path={SCHEDULER_ROUTE} element={<RoutineScheduler />} />
        </Route>

        {/* Direct to PageNotFound for routes that are not implemented */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
