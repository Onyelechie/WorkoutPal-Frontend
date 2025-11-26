import "./RoutinePage.css";

import { Outlet, useLocation, useNavigate } from "react-router";
import { SCHEDULER_ROUTE, BUILDER_ROUTE, RUNNER_ROUTE } from "../../app/AppRoutes";

export default function RoutinePage() {
  
  const navigate = useNavigate();
  const location = useLocation();

  // the paths where the header must be hidden
  const noHeader = [RUNNER_ROUTE];

  // boolean to hide the header
  const hideHeader = noHeader.some(route =>
    location.pathname.endsWith(route)
  );

  function RoutinePageNav() {
    return (
        <div className="routine-btn-container">
          <nav className="routine-nav-container">
            <button
              className={`nav-button sched ${location.pathname.endsWith(SCHEDULER_ROUTE) ? "active" : ""}`}
              onClick={() => navigate(SCHEDULER_ROUTE)}
            >
              Scheduler
            </button>

            <button
              className={`nav-button build ${location.pathname.endsWith(BUILDER_ROUTE) ? "active" : ""}`}
              onClick={() => navigate(BUILDER_ROUTE)}
            >
              Builder
            </button>
          </nav>

          <nav className="routine-nav-container">
            <button 
              className="start-routine-btn"
              onClick={() => navigate(RUNNER_ROUTE)}
            >
              Start today's workout routine
            </button>
          </nav>
        </div>
    )
  }
  

  return (
    <>
        <div className="default-container">
          {!hideHeader && <RoutinePageNav/>}  

        {/* Outlet renders the matching child route of a parent route or nothing if no child route matches */}
        {/* https://reactrouter.com/api/components/Outlet */}
        <Outlet />
        </div>
    </>
  );
}

