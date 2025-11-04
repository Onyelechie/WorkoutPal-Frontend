import "./RoutinePage.css";

import { Outlet, useLocation, useNavigate } from "react-router";
import { SCHEDULER_ROUTE, BUILDER_ROUTE } from "../../app/AppRoutes";

export default function RoutinePage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="default-container">
        <nav className="routine-nav-container">
          <button
            className={`nav-button ${location.pathname.endsWith(SCHEDULER_ROUTE) ? "active" : ""}`}
            onClick={() => navigate(SCHEDULER_ROUTE)}
          >
            Scheduler
          </button>

          <button
            className={`nav-button ${location.pathname.endsWith(BUILDER_ROUTE) ? "active" : ""}`}
            onClick={() => navigate(BUILDER_ROUTE)}
          >
            Builder
          </button>
        </nav>

        {/* Outlet renders the matching child route of a parent route or nothing if no child route matches */}
        {/* https://reactrouter.com/api/components/Outlet */}
        <Outlet />
      </div>
    </>
  );
}
