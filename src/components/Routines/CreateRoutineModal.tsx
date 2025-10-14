import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../utils/apiRequests';
import './RoutineBuilder.css';

interface CreateRoutineModalProps {
    onClose: () => void;
    setRoutines: React.Dispatch<React.SetStateAction<any[]>>;
}

const CreateRoutineModal: React.FC<CreateRoutineModalProps> = ({ onClose, setRoutines }) => {
    const [exercises, setExercises] = useState<any[]>([]);
    const [exLoading, setExLoading] = useState(false);
    const [exError, setExError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
    const [routineName, setRoutineName] = useState('');

    useEffect(() => {
        const fetchExercises = async () => {
            setExLoading(true);
            try {
                const data = await getRequest('/exercises');
                setExercises(data);
            } catch (err) {
                setExError('Failed to fetch exercises.');
            } finally {
                setExLoading(false);
            }
        };
        fetchExercises();
    }, []);

    const toggleExerciseSelection = (exercise: any) => {
        setSelectedExercises((prevSelected) => {
            if (prevSelected.some((e: any) => e.id === exercise.id)) {
                return prevSelected.filter((e: any) => e.id !== exercise.id);
            } else {
                return [...prevSelected, exercise];
            }
        });
    };

    const handleCreateRoutine = async () => {
        if (!routineName.trim()) {
            alert('Please provide a name for the routine.');
            return;
        }

        const payload = {
            name: routineName.trim(),
            exerciseIds: selectedExercises.map((e) => e.id),
        };

        try {
            const newRoutine = await postRequest('/users/1/routines', payload);
            console.log('Routine created successfully:', newRoutine);

            const updatedRoutines = await getRequest('/users/1/routines');
            setRoutines(updatedRoutines);

            onClose();
            setRoutineName('');
            setSelectedExercises([]);
        } catch (err) {
            console.error('Failed to create routine:', err);
            alert('Failed to create routine. Please try again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="back-button">
                    Back
                </button>
                <h2 className="modal-title">Create Routine</h2>

                <div className="input-group">
                    <label className="input-label">Routine Name</label>
                    <input
                        type="text"
                        value={routineName}
                        onChange={(e) => setRoutineName(e.target.value)}
                        className="text-input"
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
                    {!exLoading && !exError && exercises && exercises.length > 0 && (
                        <ul>
                            {exercises
                                .filter((exercise: any) => {
                                    if (!searchQuery.trim()) return true;
                                    const targetsStr = Array.isArray(exercise.targets)
                                        ? exercise.targets.join(', ')
                                        : String(exercise.targets);
                                    return (
                                        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        targetsStr.toLowerCase().includes(searchQuery.toLowerCase())
                                    );
                                })
                                .map((exercise: any) => (
                                    <li
                                        key={exercise.id}
                                        className="exercise-item"
                                        onClick={() => toggleExerciseSelection(exercise)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedExercises.some((e: any) => e.id === exercise.id)}
                                            readOnly
                                            style={{ marginRight: '0.5rem' }}
                                        />
                                        <strong>{exercise.name}</strong>
                                        {exercise.targets && (
                                            <div>
                                                <strong>Targets:</strong>{' '}
                                                {Array.isArray(exercise.targets)
                                                    ? exercise.targets
                                                        .map((t: string) =>
                                                            t.replace(/[{}"]/g, '')
                                                                .trim()
                                                                .replace(/\b\w/g, (c: string) => c.toUpperCase())
                                                        )
                                                        .join(', ')
                                                    : String(exercise.targets)
                                                        .replace(/[{}"]/g, '')
                                                        .trim()
                                                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                                            </div>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    )}
                    {!exLoading && !exError && exercises && exercises.length === 0 && <div>No exercises found.</div>}
                </div>

                <button onClick={handleCreateRoutine} className="create-button">
                    Create Routine
                </button>
            </div>
        </div>
    );
};

export default CreateRoutineModal;
