import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "../pages/Landing";
import PageNotFound from "../pages/PageNotFound";
import RoutineBuilder from "../pages/RoutineBuilder/RoutineBuilder";
import ProfilePage from "../pages/Profile";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function AppRoutes() {
  return (
    <>
      {/* Routing */}
      {/* Inspired from https://www.w3schools.com/react/react_router.asp */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/routine" element={<RoutineBuilder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Direct to PageNotFound for routes that are not implemented */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
