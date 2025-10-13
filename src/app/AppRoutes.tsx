import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import RoutineBuilder from "../pages/RoutineBuilder/RoutineBuilder";
import ProfilePage from "../pages/Profile/ProfilePage";
import Login from "../pages/Login/Login";

export default function AppRoutes() {
  return (
    <>
      {/* All routes in the app */}
      {/* Inspired from https://www.w3schools.com/react/react_router.asp */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/routine" element={<RoutineBuilder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Direct to PageNotFound for routes that are not implemented */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
