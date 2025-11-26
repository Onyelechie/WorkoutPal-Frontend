import { useEffect, useState } from "react";
import { daysLongForm, formatApiTime } from "../../../../utils/date";
import RoutineList from "../RoutineBuilder/RoutineList";
import type { Schedule, Routine } from "../../../../types/api"
import { getRequest } from "../../../../utils/apiRequests";
import { useErrorHandler } from "../../../../hooks/useErrorHandler";
import { getTodayIndex } from "../../../../utils/date";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { SCHEDULER_ROUTE } from "../../../../app/AppRoutes";

interface ScheduleSelectorProps {
    schedules: Schedule[],
    setSelectedSchedule: React.Dispatch<React.SetStateAction<Schedule | undefined>>;
    currDayIndex: number,
    setCurrDayIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ScheduleSelector({schedules, setSelectedSchedule, currDayIndex, setCurrDayIndex}:ScheduleSelectorProps) {

    const { alertOnRequestError } = useErrorHandler();
    const navigate = useNavigate();

    const today = getTodayIndex();

    const hasSchedules = schedules.length > 0;

    // schedule states
    const [currSchedIndex, setCurrSchedIndex] = useState(0);

    // routine states
    const [routines, setRoutines] = useState<Routine[]>([]);
    const hasRoutines = routines.length > 0;

    function handleSelectorButtonClick() {
        if (hasRoutines && hasSchedules) {
            setSelectedSchedule(schedules[currSchedIndex]);
        } else {
            // go back to the scheduler
            goBack();
        }
    }

    function goBack() {
        navigate(`../${SCHEDULER_ROUTE}`);
    }

    async function getRoutines(ids: number[]) {
        if (ids !== null) {
            try {
                const responses = await Promise.all(
                    ids.map((id) => getRequest(`/routines/${id}`))
                );
                const routines: Routine[] = responses.map((res) => res.data);
                setRoutines(routines);
            } catch (error: any) {
                setRoutines([]);
                alertOnRequestError("Could not get routines", error);
            }
        } else {
            setRoutines([]);
        }
    }


    useEffect(() => {
        // only get routines if there's a schedule
        if (schedules && schedules[currSchedIndex]) {
            getRoutines(schedules[currSchedIndex].routineIds);
        } else {
            setRoutines([]);
        }
    }, [schedules, currSchedIndex]);

    return (
        <>
            <button onClick={goBack}>{"← Back"}</button>
            <div className="schedule-selector-grid">
                <div className="grid-item item-container">
                    <label>Day:</label>
                    <select     
                        name="day-select"
                        className="day-select"
                        value={currDayIndex}
                        onChange={(e) => setCurrDayIndex(Number(e.target.value))}
                    >
                        {daysLongForm?.map((day, index) => (
                            <option key={index} value={index}>{index == today ? `${day} (today)`: day}</option>
                        ))}
                    </select>

                    <label>Schedule:</label>
                    <select     
                        name="schedule-select"
                        className="schedule-select"
                        value={currSchedIndex}
                        onChange={(e) => setCurrSchedIndex(Number(e.target.value))}
                        disabled={!hasSchedules}
                    >
                        {hasSchedules ? schedules?.map((schedule, index) => (
                            <option key={schedule.id} value={index}>{schedule.name} ({formatApiTime(schedule.timeSlot)})</option>
                        ))
                        : <option>No schedules available.</option>
                        }
                    </select>

                    <button  
                        className={clsx("runner-btn", {
                                    "blue": hasSchedules && hasRoutines,
                                    "unavailable": !hasSchedules || !hasRoutines
                        })}
                        onClick={handleSelectorButtonClick}
                    >
                        {/* 
                            If there's a schedule with routines, print "Start workout!"
                            If there's no routines, print "Add a routine?"
                            If there's no schedule at all, print "Add a schedule?"
                        */}
                        {
                        hasSchedules && hasRoutines ? "Start Workout!" : 
                        hasSchedules && !hasRoutines ? "Add a routine?" : "Add a schedule?"
                        }
                    </button>

                    {/* Print total length of schedule */}
                    {hasSchedules && schedules[currSchedIndex]?.routineLengthMinutes &&
                        <ul className="schedule-info-list">
                            <li>Schedule length: {schedules[currSchedIndex].routineLengthMinutes} minutes</li>
                        </ul>
                    }
                </div>

                <div className="grid-item item-container">
                    <h3>{currDayIndex == today ? "Today's" : `${daysLongForm[currDayIndex]}'s`} routines {hasSchedules && `for ${schedules[currSchedIndex]?.name}`}</h3>
                    <RoutineList routines={routines} setRoutines={setRoutines}/>
                </div>
            </div>
        </>
    )
}