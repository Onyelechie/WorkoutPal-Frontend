import { BrowserRouter, Routes, Route } from 'react-router';
import LandingView from "../pages/LandingView";
import PageNotFound from "../pages/PageNotFound";
import RoutineBuilderView from "../pages/RoutineBuilder/RoutineBuilder";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<LandingView/>}/>
          <Route path="/routine" element={<RoutineBuilderView/>}/>

          {/* Direct to PageNotFound for routes that are not implemented */}
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
