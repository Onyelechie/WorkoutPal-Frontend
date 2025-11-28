import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { useRoutines } from "../../../hooks/useRoutines";
import { useState, useEffect } from "react";
import { getRequest } from "../../../utils/apiRequests";
import "./MyWorkouts.css";
import type { Exercise } from "../../../types/api";

function MyWorkouts() {
  const { routines, isLoading, error } = useRoutines();
  const [exerciseMap, setExerciseMap] = useState<Record<number, Exercise>>({});

  useEffect(() => {
    const fetchExercises = async () => {
      if (!routines || routines.length === 0) return;
      
      const allExerciseIds = Array.from(
        new Set(routines.flatMap((r) => r.Exercises || []))
      );

      try {
        const exercisePromises = allExerciseIds.map((id) =>
          getRequest(`/exercises/${id}`).then((res) => res.data)
        );
        const exercises = await Promise.all(exercisePromises);

        const map: Record<number, Exercise> = {};
        exercises.forEach((ex: Exercise) => {
          map[ex.id] = ex;
        });

        setExerciseMap(map);
      } catch (err) {
        console.error("Failed to fetch exercises:", err);
      }
    };

    fetchExercises();
  }, [routines]);

  const getRoutineDescription = (routine: any) => {
    if (!routine.exerciseIds || routine.exerciseIds.length === 0) {
      return "No exercises added";
    }
    
    const exerciseNames = routine.exerciseIds
      .map((id: number) => exerciseMap[id]?.name)
      .filter(Boolean)
      .slice(0, 3)
      .join(", ");
    
    const remaining = routine.exerciseIds.length - 3;
    return exerciseNames + (remaining > 0 ? ` +${remaining} more` : "");
  };

  return (
    <>
      <div className="my-workouts-container">
        <h2>My Workouts</h2>
        <div className="workout-cards-container">
          {isLoading && <div>Loading routines...</div>}
          {error && <div>Failed to load routines</div>}
          {!isLoading && !error && routines.length === 0 && (
            <div>No routines created yet</div>
          )}
          {!isLoading && !error && routines.length > 0 &&
            routines.map((routine) => (
              <WorkoutCard 
                key={routine.id} 
                title={routine.name} 
                description={getRoutineDescription(routine)} 
              />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default MyWorkouts;
