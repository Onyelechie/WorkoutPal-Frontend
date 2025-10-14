import React from 'react';
import { deleteRequest } from '../../utils/apiRequests';
import './RoutineBuilder.css';

interface RoutineListProps {
    routines: any[];
    setRoutines: React.Dispatch<React.SetStateAction<any[]>>;
}

const RoutineList: React.FC<RoutineListProps> = ({ routines, setRoutines }) => {
    if (!routines || routines.length === 0) {
        return <div>No routines available.</div>;
    }

    const handleDeleteRoutine = async (id: number) => {
        try {
            await deleteRequest(`/routines/${id}`);
            setRoutines((prevRoutines) => prevRoutines.filter((r) => r.id !== id));
        } catch (err) {
            console.error('Failed to delete routine:', err);
            alert('Failed to delete routine. Please try again.');
        }
    };

    return (
        <div className="routine-list">
            {routines.map((routine) => (
                <div key={routine.id} className="routine-card">
                    <h3 className="routine-name">{routine.name}</h3>
                    <button
                        onClick={() => handleDeleteRoutine(routine.id)}
                        className="delete-button"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RoutineList;
