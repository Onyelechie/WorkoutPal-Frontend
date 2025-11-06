import React, { useEffect, useState } from "react";
import { deleteRequest, getRequest } from "../../../../utils/apiRequests";
import { useConfirmDialog } from "../../../../hooks/useDialog";
import { useErrorHandler } from "../../../../hooks/useErrorHandler";
import { ROUTINE_DELETE_FAIL } from "../../../../app/constants/genericErrors";

interface RoutineListProps {
  routines: any[];
  setRoutines: React.Dispatch<React.SetStateAction<any[]>>;
}

interface Exercise {
  id: number;
  name: string;
}

const RoutineList: React.FC<RoutineListProps> = ({ routines, setRoutines }) => {
  const { alertOnRequestError } = useErrorHandler();
  const [exerciseMap, setExerciseMap] = useState<Record<number, Exercise>>({});
  const confirmDialog = useConfirmDialog();
  useEffect(() => {
    const fetchExercises = async () => {
      const allExerciseIds = Array.from(
        new Set(routines.flatMap((r) => r.exerciseIds || [])),
      );

      try {
        const exercisePromises = allExerciseIds.map((id) =>
          getRequest(`/exercises/${id}`).then((res) => res.data),
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

    if (routines && routines.length > 0) {
      fetchExercises();
    }
  }, [routines]);

  const handleDeleteRoutine = async (id: number) => {
    try {
      if (
        await confirmDialog.showConfirmRisky(
          "Delete Routine",
          "Are you sure you want to delete this routine?",
          "Yes, Delete",
          "Don't Delete",
        )
      ) {
        await deleteRequest(`/routines/${id}`);
        setRoutines((prevRoutines) => prevRoutines.filter((r) => r.id !== id));
      }
    } catch (err: any) {
      alertOnRequestError(ROUTINE_DELETE_FAIL, err);
    }
  };

  if (!routines || routines.length === 0) {
    return <div>No routines available.</div>;
  }

  return (
    <div className="routine-list">
      {routines.map((routine) => (
        <div key={routine.id} className="routine-card">
          <h3 className="routine-name">{routine.name}</h3>
          <h4>Exercises:</h4>
          {routine.exerciseIds && routine.exerciseIds.length > 0 ? (
            <ul className="exercise-in-routine-list">
              {routine.exerciseIds.map((id: number) => (
                <li key={id}>{exerciseMap[id]?.name || "Loading..."}</li>
              ))}
            </ul>
          ) : (
            <p>No exercises added</p>
          )}
          <button
            onClick={() => handleDeleteRoutine(routine.id)}
            className="delete-button"
            data-cy="delete-routine-btn"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default RoutineList;
