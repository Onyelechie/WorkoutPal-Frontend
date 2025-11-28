import { useRoutines } from "../../../hooks/useRoutines";
import RoutineList from "../Routines/RoutineBuilder/RoutineList";
import "./MyWorkouts.css";

function MyWorkouts() {
  const { routines, setRoutines, isLoading, error } = useRoutines();

  return (
    <div className="my-workouts-container">
      <h2>My Routines</h2>
      {isLoading && <div>Loading routines...</div>}
      {error && <div>Failed to load routines</div>}
      {!isLoading && !error && <RoutineList routines={routines} setRoutines={setRoutines} />}
    </div>
  );
}

export default MyWorkouts;