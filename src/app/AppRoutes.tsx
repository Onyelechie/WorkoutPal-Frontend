import { BrowserRouter, Routes, Route } from 'react-router';
import Landing from "../pages/Landing";
import PageNotFound from "../pages/PageNotFound";
import RoutineBuilder from "../pages/RoutineBuilder/RoutineBuilder";

export default function AppRoutes() {
  return (
    <>
      {/* Routing */}
      {/* Inspired from https://www.w3schools.com/react/react_router.asp */}
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Landing/>}/>
          <Route path="/routine" element={<RoutineBuilder/>}/>

          {/* Direct to PageNotFound for routes that are not implemented */}
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
