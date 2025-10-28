import { useState, useEffect } from "react";
import type { Routine } from "../../../types/api";
import { postRequest } from "../../../utils/apiRequests";
import { daysLongForm, getCurrentTime, getTodayIndex } from "../../../utils/date";
import { useAlertDialog } from "../../../hooks/useAlertDialog";

interface CreateScheduleModalProps {
    open: boolean,
    onClose: () => void,
    routines: Routine[],
    setSchedules: React.Dispatch<React.SetStateAction<any[]>>
}

interface SchedulePayload {
    name: string,
    dayOfWeek: number,
    routineIds: number[],
    timeSlot: string,
    routineLengthMinutes: number | ""
}

export default function CreateScheduleModal({open, onClose, routines, setSchedules}:CreateScheduleModalProps) {

    const dialogContext = useAlertDialog();

    const defaultSchedulePayload = (): SchedulePayload => ({
        name: "",
        dayOfWeek: getTodayIndex(),
        routineIds: [],
        timeSlot: getCurrentTime(),
        routineLengthMinutes: "",
    });

    // state variables
    const [schedulePayload, setSchedulePayload] = useState(defaultSchedulePayload);

    useEffect(() => {
        setSchedulePayload(defaultSchedulePayload());
    }, [open]); // reset the form payload everytime the modal is closed or opened

    async function handleCreateRoutine(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // prevent a page refresh
        try {
            const response = await postRequest("/schedules", schedulePayload);
            setSchedules((prev) => ([...prev, response.data]));
            onClose();
        } catch (error: any) {
            dialogContext.showAlert("Could not create the routine!", error?.message);
        }
    }

    return <>
    {open && 
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="back-button">Back</button>

                <h2 className="modal-title">Create Schedule</h2>

                <form onSubmit={handleCreateRoutine}>
                    <div className="input-group">

                        <label className="input-label">Routine Name</label>
                        <input
                            type="text"
                            value={schedulePayload.name}
                            onChange={(e) => setSchedulePayload({...schedulePayload, name: e.target.value})}
                            className="text-input"
                            required
                        />

                        <label className="input-label">Select Routines</label>
                        <div className="flex flex-col gap-2">
                        {/* Dropdown to pick a routine */}
                            <select
                                value=""
                                onChange={(e) => {
                                const selectedId = Number(e.target.value);
                                if (selectedId && !schedulePayload.routineIds.includes(selectedId)) {
                                    setSchedulePayload({
                                    ...schedulePayload,
                                    routineIds: [...schedulePayload.routineIds, selectedId],
                                    });
                                }
                                }}
                                className="text-input"
                            >
                            <option value="">Select a routine...</option>
                            {routines.map((routine) => (
                                <option key={routine.id} value={routine.id}>
                                    {routine.name}
                                </option>
                            ))}
                        </select>

                        {/* Display selected routines as tags with remove buttons */}
                        <div className="tag-container">
                            {schedulePayload.routineIds.map((id) => {
                            const routine = routines.find((r) => r.id === id);
                            return (
                                <div key={id} className="tag">
                                    <span className="tag-name">{routine?.name}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                            setSchedulePayload({
                                                ...schedulePayload,
                                                routineIds: schedulePayload.routineIds.filter((rid) => rid !== id),
                                            })
                                            }
                                        >
                                            x
                                        </button>
                                </div>
                            );
                            })}
                        </div>
                        </div>

                        <label className="input-label">Day</label>
                        <select value={schedulePayload.dayOfWeek} onChange={(e) => setSchedulePayload({...schedulePayload, dayOfWeek: Number(e.target.value)})}>
                            {daysLongForm.map((day, index) => (
                                <option value={index}>{day}</option>
                            ))}
                        </select>

                        <label className="input-label">Time Slot</label>
                        <input
                            type="time"
                            value={schedulePayload.timeSlot}
                            onChange={(e) => setSchedulePayload({...schedulePayload, timeSlot: e.target.value})}
                            className="text-input"
                            required
                        />

                        <label className="input-label">Routine Length (minutes)</label>
                        <input
                            type="number"
                            value={schedulePayload.routineLengthMinutes}
                            onChange={(e) => setSchedulePayload({...schedulePayload, routineLengthMinutes: e.target.value === "" ? "" : Number(e.target.value)})}
                            className="text-input"
                            required
                        />

                        <button type="submit" className="create-button">
                            Create Schedule
                        </button>
                    </div>
                </form>
            </div>
        </div>
    }   
    </>
}