import React, { useEffect, useState } from 'react';
import { deleteRequest, getRequest } from '../../../utils/apiRequests';
import './RoutineBuilder.css';

interface RoutineListProps {
    routines: any[];
    setRoutines: React.Dispatch<React.SetStateAction<any[]>>;
}

interface Exercise {
    id: number;
    name: string;
}

const RoutineList: React.FC<RoutineListProps> = ({ routines, setRoutines }) => {
    const [exerciseMap, setExerciseMap] = useState<Record<number, Exercise>>({});

    useEffect(() => {
        const fetchExercises = async () => {
            const allExerciseIds = Array.from(
                new Set(routines.flatMap((r) => r.exerciseIds || []))
            );

            try {
                const exercisePromises = allExerciseIds.map((id) => getRequest(`/exercises/${id}`).then((res) => res.data));
                const exercises = await Promise.all(exercisePromises);

                const map: Record<number, Exercise> = {};
                exercises.forEach((ex: Exercise) => {
                    map[ex.id] = ex;
                });

                setExerciseMap(map);
            } catch (err) {
                console.error('Failed to fetch exercises:', err);
            }
        };

        if (routines && routines.length > 0) {
            fetchExercises();
        }
    }, [routines]);

    const handleDeleteRoutine = async (id: number) => {
        try {
            await deleteRequest(`/routines/${id}`);
            setRoutines((prevRoutines) => prevRoutines.filter((r) => r.id !== id));
        } catch (err) {
            console.error('Failed to delete routine:', err);
            alert('Failed to delete routine. Please try again.');
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
                                <li key={id}>{exerciseMap[id]?.name || 'Loading...'}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No exercises added</p>
                    )}
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
