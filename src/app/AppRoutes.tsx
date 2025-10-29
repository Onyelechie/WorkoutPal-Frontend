import { Routes, Route, Navigate } from "react-router";
import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";

import ProfilePage from "../pages/Profile/ProfilePage";
import OtherUserPage from "../pages/Profile/OtherUserPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import RoutinePage from "../pages/Routine/RoutinePage";

export const LOGIN_ROUTE = "/auth/login";
export const REGISTER_ROUTE = "/auth/register";
export const HOME_ROUTE = "/home";
export const PROFILE_ROUTE = "/profile";
export const ROUTINE_ROUTE = "/routine";

export default function AppRoutes() {
  return (
    <>
      {/* All routes in the app */}
      {/* Inspired from https://www.w3schools.com/react/react_router.asp */}
      <Routes>
        {/* Redirect path '/' to the login. Redirection code retrieved from ChatGPT */}
        <Route path="/" element={<Navigate to={LOGIN_ROUTE} replace />} />

        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={REGISTER_ROUTE} element={<RegisterPage />} />

        <Route path={HOME_ROUTE} element={<HomePage />} />
        <Route path={PROFILE_ROUTE} element={<ProfilePage />} />
  <Route path="/users/:id" element={<OtherUserPage />} />
        <Route path={ROUTINE_ROUTE} element={<RoutinePage />} />

        {/* Direct to PageNotFound for routes that are not implemented */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
