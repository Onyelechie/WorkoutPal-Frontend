import "./RoutineBuilder.css";
import '../Routines.css';

import { useEffect, useState } from "react";
import { getRequest } from "../../../utils/apiRequests.ts";
import RoutineList from "./RoutineList.tsx";
import CreateRoutineModal from "./CreateRoutineModal.tsx";

export default function RoutineBuilder() {
  const [routines, setRoutines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchRoutines() {
            try {
                const meResponse = await getRequest('/me');
                const userId = meResponse.data.id;

                const routineResponse = await getRequest(`/users/${userId}/routines`);
                setRoutines(routineResponse.data);
            } catch (err) {
                setError('Failed to fetch routines.');
            } finally {
                setLoading(false);
            }
        }

        fetchRoutines();
    }, []);

  const handleAddRoutineClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="routine-builder-container">
      <header className="routine-builder-header">
        <h2 className="routine-builder-title">Build your workout routines!</h2>
        <div className="routine-builder-action-buttons grouped-buttons">
          <button onClick={handleAddRoutineClick}>Add routine</button>
        </div>
      </header>

      {loading && <div>Loading routines...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
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
