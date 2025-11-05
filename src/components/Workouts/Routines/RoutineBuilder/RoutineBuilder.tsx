import "./RoutineBuilder.css";
import "../Routines.css";

import { useState } from "react";
import RoutineList from "./RoutineList.tsx";
import CreateRoutineModal from "./CreateRoutineModal.tsx";
import { useRoutines } from "../../../../hooks/useRoutines.ts";

export default function RoutineBuilder() {
  const { routines, setRoutines, error, isLoading } = useRoutines();

  const [showModal, setShowModal] = useState(false);
  const handleAddRoutineClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="routine-builder-container">
      <header className="routine-builder-header">
        <h2 className="routine-builder-title">Build your workout routines!</h2>
        <div className="routine-builder-action-buttons grouped-buttons">
          <button onClick={handleAddRoutineClick} data-cy="add-routine-btn">Add routine</button>
        </div>
      </header>

      {isLoading && <div>Loading routines...</div>}
      {error && <div>{error.message}</div>}
      {!isLoading && !error && (
        <RoutineList routines={routines} setRoutines={setRoutines} />
      )}

      {showModal && (
        <CreateRoutineModal
          onClose={handleCloseModal}
          setRoutines={setRoutines}
        />
      )}
    </div>
  );
}
