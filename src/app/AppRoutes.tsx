import { Routes, Route, Navigate } from "react-router";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";

import Profile from "../pages/Profile";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Routine from "../pages/Routine/RoutinePage";

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

        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />

        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={PROFILE_ROUTE} element={<Profile />} />
        <Route path={ROUTINE_ROUTE} element={<Routine />} />

        {/* Direct to PageNotFound for routes that are not implemented */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
