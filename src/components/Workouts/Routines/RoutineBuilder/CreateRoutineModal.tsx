import React, { useState, useEffect } from "react";
import { getRequest, postRequest } from "../../../../utils/apiRequests";
import {
  toggleExerciseSelection,
  filterExercises,
  buildRoutinePayload,
} from "../../../../utils/routineHelpers";
import { useErrorHandler } from "../../../../hooks/useErrorHandler";
import { ROUTINE_CREATE_FAIL } from "../../../../app/constants/genericErrors";

interface CreateRoutineModalProps {
  onClose: () => void;
  setRoutines: React.Dispatch<React.SetStateAction<any[]>>;
}

const CreateRoutineModal: React.FC<CreateRoutineModalProps> = ({
  onClose,
  setRoutines,
}) => {
  const { alertOnRequestError } = useErrorHandler();

  const [exercises, setExercises] = useState<any[]>([]);
  const [exLoading, setExLoading] = useState(false);
  const [exError, setExError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const [routineName, setRoutineName] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      setExLoading(true);
      try {
        const response = await getRequest("/exercises");
        setExercises(response.data);
      } catch (err) {
        setExError("Failed to fetch exercises.");
      } finally {
        setExLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const handleToggle = (exercise: any) => {
    setSelectedExercises((prev) => toggleExerciseSelection(prev, exercise));
  };

  const handleCreateRoutine = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault(); // prevent a refresh
    const payload = buildRoutinePayload(routineName, selectedExercises);

    try {
      const userResponse = await getRequest("/me");
      const userId = userResponse.data.id;

      await postRequest(`/users/${userId}/routines`, payload);
      const newRoutinesResponse = await getRequest(`/users/${userId}/routines`);
      setRoutines(newRoutinesResponse.data);

      onClose();
      setRoutineName("");
      setSelectedExercises([]);
    } catch (err: any) {
      alertOnRequestError(ROUTINE_CREATE_FAIL, err);
    }
  };

  const filteredExercises = filterExercises(exercises, searchQuery);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="back-button">
          Back
        </button>
        <h2 className="modal-title">Create Routine</h2>

        <form onSubmit={handleCreateRoutine}>
          <div className="input-group">
            <label className="input-label">Routine Name</label>
            <input
              type="text"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="text-input"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Search by name or target (e.g. abs, sit-up)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-input"
            />
          </div>

          <div className="exercise-list">
            {exLoading && <div>Loading exercises...</div>}
            {exError && <div>{exError}</div>}
            {!exLoading && !exError && filteredExercises.length > 0 && (
              <ul>
                {filteredExercises.map((exercise) => (
                  <li
                    key={exercise.id}
                    className="exercise-item"
                    onClick={() => handleToggle(exercise)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedExercises.some(
                        (e) => e.id === exercise.id,
                      )}
                      readOnly
                      style={{ marginRight: "0.5rem" }}
                    />
                    <strong>{exercise.name}</strong>
                    {exercise.targets && (
                      <div>
                        <strong>Targets:</strong>{" "}
                        {Array.isArray(exercise.targets)
                          ? exercise.targets
                              .map((t: string) =>
                                t
                                  .replace(/[{}"]/g, "")
                                  .trim()
                                  .replace(/\b\w/g, (c: string) =>
                                    c.toUpperCase(),
                                  ),
                              )
                              .join(", ")
                          : String(exercise.targets)
                              .replace(/[{}"]/g, "")
                              .trim()
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {!exLoading && !exError && filteredExercises.length === 0 && (
              <div>No exercises found.</div>
            )}
          </div>
          <div className="action-button-container">
            <button type="submit" className="create-button">
              Create Routine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoutineModal;
