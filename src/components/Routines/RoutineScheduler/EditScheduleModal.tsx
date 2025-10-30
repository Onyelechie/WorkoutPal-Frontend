import type { Routine, Schedule } from "../../../types/api";
import { daysLongForm, formatApiTime } from "../../../utils/date";
import { useState, useEffect } from "react";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { deleteRequest, putRequest } from "../../../utils/apiRequests";
import { SCHEDULE_DELETE_FAIL, SCHEDULE_EDIT_FAIL } from "../../../app/constants/genericErrors";

interface EditScheduleModalProps {
    open: boolean, // boolean to trigger the modal
    onClose: () => void // function to call upon closing the modal
    selectedSchedule:Schedule, // local state of the selected schedule
    setSchedules: React.Dispatch<React.SetStateAction<any[]>>, // be able to set local state of schedules
    routines: Routine[], // local state of existing routines
}

// A modal to be able to edit or delete a selected schedule
export default function EditScheduleModal({open, onClose, selectedSchedule, setSchedules, routines }:EditScheduleModalProps) {

    // generic handler for request errors
    const { alertOnRequestError } = useErrorHandler();
    
    // state variable
    const [schedulePayload, setSchedulePayload] = useState<Schedule>({...selectedSchedule});

    // format the schedule on load to ensure that inputs are pre-filled appropriately
    useEffect(() => {
        if (open) {
            const formattedSchedule = {
                ...selectedSchedule,
                timeSlot: formatApiTime(selectedSchedule.timeSlot), // format the date
                routineIds: selectedSchedule.routineIds ?? [], // ensure undefined or null gets initialized to an empty array
            };
            setSchedulePayload(formattedSchedule);
        }
    }, [selectedSchedule, open]);

    async function handleEditSchedule(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const response = await putRequest(`/schedules/${schedulePayload.id}`, schedulePayload);
            setSchedules((prev) =>
                prev.map((s) =>
                    s.id === response.data.id ? response.data : s // replace the matching schedule
                )
            );
            onClose();
        } catch (error: any) {
            alertOnRequestError(SCHEDULE_EDIT_FAIL, error);
        }
    }

    async function handleDeleteSchedule() {
        try {
            await deleteRequest(`/schedules/${schedulePayload.id}`);
            setSchedules((prev) => prev.filter((s) => s.id !== schedulePayload.id));
            onClose();
        } catch (error: any) {
            alertOnRequestError(SCHEDULE_DELETE_FAIL, error);
        }
    }

    return (
    <>
        {open && selectedSchedule && schedulePayload &&
        <>
            
            <div className="modal-overlay">
                        <div className="modal-content">
                            <button onClick={onClose} className="back-button">Back</button>
                            <h2 className="modal-title">Edit Schedule</h2>
            
                            <form onSubmit={handleEditSchedule}>
                                <div className="input-group"> {/* START OF INPUT GROUP DIV */}
            
                                    {/* START OF ROUTINE NAME INPUT */}
                                    <label className="input-label">Routine Name</label>
                                    <input
                                        type="text"
                                        value={schedulePayload.name}
                                        onChange={(e) => setSchedulePayload({...schedulePayload, name: e.target.value})}
                                        className="text-input"
                                        required
                                    />
                                    {/* END OF ROUTINE NAME INPUT */}
            
                                    {/* START OF SELECT ROUTINES. SELECT ROUTINES CODE INSPIRED BY CHATGPT */}
                                    <label className="input-label">Select Routines</label>
                                    <div className="flex flex-col gap-2">
                                        {/* Dropdown to pick a routine */}
                                            <select
                                                value=""
                                                onChange={(e) => {
                                                const selectedId = Number(e.target.value);
                                                if (selectedId && !schedulePayload.routineIds?.includes(selectedId)) {
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
                                            {schedulePayload.routineIds?.map((id) => {
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
                                    {/* END OF SELECT ROUTINES */}
            
            
                                    {/* START OF DAY SELECT */}
                                    <label className="input-label">Day</label>
                                    <select value={schedulePayload.dayOfWeek} onChange={(e) => setSchedulePayload({...schedulePayload, dayOfWeek: Number(e.target.value)})}>
                                        {daysLongForm.map((day, index) => (
                                            <option value={index}>{day}</option>
                                        ))}
                                    </select>
                                    {/* END OF DAY SELECT */}
            
                                    {/* START OF TIME SLOT INPUT */}
                                    <label className="input-label">Time Slot</label>
                                    <input
                                        type="time"
                                        value={schedulePayload.timeSlot}
                                        onChange={(e) => setSchedulePayload({...schedulePayload, timeSlot: e.target.value})}
                                        className="text-input"
                                        required
                                    />
                                    {/* END OF TIME SLOT INPUT */}
                                    
                                    {/* START OF ROUTINE LENGTH INPUT */}
                                    <label className="input-label">Routine Length (minutes)</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={schedulePayload.routineLengthMinutes}
                                        onChange={(e) => setSchedulePayload({...schedulePayload, routineLengthMinutes: Number(e.target.value) || 0})}
                                        className="text-input"
                                        required
                                    />
                                    {/* END OF ROUTINE LENGTH INPUT */}
                                    <div className="action-button-container" style={{justifyContent: "space-between"}}>
                                        <button type="button" className="delete-button" onClick={handleDeleteSchedule}>
                                            Delete Schedule
                                        </button>
                                        <button type="submit" className="create-button">
                                            Edit Schedule
                                        </button>
                                    </div>
                                </div> {/* END OF INPUT GROUP DIV */}
                            </form>
                        </div>
                    </div>
        </>
        }
    </>
    )
};