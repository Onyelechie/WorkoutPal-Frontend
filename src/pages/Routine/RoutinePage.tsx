

import { Outlet, useNavigate } from "react-router";

export default function RoutinePage() {

    const navigate = useNavigate();

    return (
    <>
        <div className="default-container">
            <button onClick={() => {navigate("scheduler")}}> Go to scheduler </button>
            <button onClick={() => {navigate("builder")}}> Go to builder </button>

            {/* Outlet renders the matching child route of a parent route or nothing if no child route matches */}
            {/* https://reactrouter.com/api/components/Outlet */}
            <Outlet/> 
        </div>
    </>
    );
};
