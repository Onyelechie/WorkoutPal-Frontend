import { useEffect, useState } from 'react';
import { getRequest, postRequest, deleteRequest } from '../../utils/apiRequests';
import { notYetImplemented } from '../../utils/construction.ts';
import './RoutineBuilder.css';

export default function RoutineBuilder() {
    const [routines, setRoutines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [exercises, setExercises] = useState<any[]>([]);
    const [exLoading, setExLoading] = useState(false);
    const [exError, setExError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
    const [routineName, setRoutineName] = useState('');

    useEffect(() => {
        async function fetchRoutines() {
            try {
                const data = await getRequest('/users/1/routines');
                setRoutines(data);
            } catch (err) {
                setError('Failed to fetch routines.');
            } finally {
                setLoading(false);
            }
        }
        fetchRoutines();
    }, []);

    const handleAddRoutineClick = async () => {
        setShowModal(true);
        setExLoading(true);
        setExError(null);
        try {
            const data = await getRequest('/exercises');
            setExercises(data);
        } catch (err) {
            setExError('Failed to fetch exercises.');
        } finally {
            setExLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setExercises([]);
        setExError(null);
    };

    const toggleExerciseSelection = (exercise: any) => {
        setSelectedExercises(prevSelected => {
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
            exerciseIds: selectedExercises.map(e => e.id),
        };

        try {
            const newRoutine = await postRequest('/users/1/routines', payload);
            console.log('Routine created successfully:', newRoutine);

            const updatedRoutines = await getRequest('/users/1/routines');
            setRoutines(updatedRoutines);

            setShowModal(false);
            setRoutineName('');
            setSelectedExercises([]);
        } catch (err) {
            console.error('Failed to create routine:', err);
            alert('Failed to create routine. Please try again.');
        }
    };

    const handleDeleteRoutine = async (id: number) => {
        try {
            await deleteRequest(`/routines/${id}`);
            setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.id !== id));
        } catch (err) {
            console.error('Failed to delete routine:', err);
            alert('Failed to delete routine. Please try again.');
        }
    };



    return (
        <>
            <div className="routine-builder-container">
                <header className="routine-builder-header">
                    <button onClick={notYetImplemented}>Back</button>
                    <h2 className="routine-builder-title">Plan your workout routines!</h2>
                    <div className="routine-builder-action-buttons grouped-buttons">
                        <button onClick={handleAddRoutineClick}>Add routine</button>
                        {/* <button onClick={notYetImplemented}>Start today's workout</button> */}
                    </div>
                </header>

                {loading && <div>Loading routines...</div>}
                {error && <div>{error}</div>}
                {!loading && !error && (!routines || routines.length === 0) && (
                    <div>You don't have any routines yet, try making one.</div>
                )}
                {!loading && !error && routines && routines.length > 0 && (
                    <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '1rem'}}>
                        {routines.map((routine, idx) => (
                            <div
                                key={idx}
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <h3 style={{margin: '0 0 0.5rem 0', color: '#333'}}>{routine.name}</h3>
                                <button onClick={() => handleDeleteRoutine(routine.id)} style={{ color: 'red' }}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div
                        className="modal-content"
                        style={{
                            background: '#fff',
                            padding: '2rem',
                            borderRadius: '8px',
                            maxWidth: '85%',
                            minWidth: '600px',
                            maxHeight: '80vh',
                            overflowY: 'auto'
                        }}
                    >
                        <button onClick={handleCloseModal} style={{ float: 'left', marginBottom: '1rem' }}>Back</button>
                        <h2 style={{ textAlign: 'center' }}>Create Routine</h2>

                        {/* Routine info inputs */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Routine Name</label>
                            <input
                                type="text"
                                value={routineName}
                                onChange={e => setRoutineName(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                            />
                        </div>

                        {/* Search field */}
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Search by name or target (e.g. abs, sit-up)"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                            />
                        </div>

                        {/* All Exercises */}
                        <div
                            style={{
                                maxHeight: '300px',
                                overflowY: 'auto',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '0.5rem',
                                marginBottom: '1rem'
                            }}
                        >
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
                                                style={{
                                                    marginBottom: '1rem',
                                                    cursor: 'pointer',
                                                    padding: '0.5rem',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px'
                                                }}
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
                                                        <strong>Targets:</strong>{" "}
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
                                                                .replace(/\b\w/g, c => c.toUpperCase())}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                </ul>
                            )}
                            {!exLoading && !exError && exercises && exercises.length === 0 && (
                                <div>No exercises found.</div>
                            )}
                        </div>

                        {/* Currently Added Exercises Section */}
                        {selectedExercises.length > 0 && (
                            <div
                                style={{
                                    borderTop: '2px solid #eee',
                                    paddingTop: '1rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                <h3 style={{ marginBottom: '0.5rem' }}>Currently Added Exercises</h3>
                                <ul>
                                    {selectedExercises.map(ex => (
                                        <li
                                            key={ex.id}
                                            style={{
                                                marginBottom: '0.5rem',
                                                padding: '0.5rem',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                backgroundColor: '#f9f9f9',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div>
                                                <strong>{ex.name}</strong>
                                                {ex.targets && (
                                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                                        {Array.isArray(ex.targets)
                                                            ? ex.targets.join(', ')
                                                            : String(ex.targets)}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => toggleExerciseSelection(ex)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'red',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={handleCreateRoutine}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                fontSize: '1rem',
                                background: 'green',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Create Routine
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}