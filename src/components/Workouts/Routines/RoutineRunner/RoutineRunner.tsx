import { useEffect, useState } from "react";
import type { Schedule } from "../../../../types/api";
import { getRequest } from "../../../../utils/apiRequests";
import { getTodayIndex } from "../../../../utils/date";
import { useErrorHandler } from "../../../../hooks/useErrorHandler";
import ScheduleSelector from "./ScheduleSelector";

import "./RoutineRunner.css";

export default function RoutineRunner() {

    const { alertOnRequestError } = useErrorHandler();

    const today = getTodayIndex();
    const [currDayIndex, setCurrDayIndex] = useState(today);

    // schedule states
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [currSchedIndex, setCurrSchedIndex] = useState(0);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>(undefined);

    // routine runner state
    const [startSchedule, setStartSchedule] = useState(false);

    async function getSchedules(dayOfWeek:number) {
        if (dayOfWeek !== null) {
            try {
                const response = await getRequest(`/schedules/of/${dayOfWeek}`);
                if (response.data !== null) setSchedules(response.data);
                else setSchedules([]);
            } catch (error: any) {
                setSchedules([]);
                alertOnRequestError("Could not get today's schedule", error);
            }
        } else {
            setSchedules([]);
        }
    }
    
    useEffect(() => {
        getSchedules(currDayIndex);
        // re-initialize schedules and routines
        setSchedules([]);
    }, [currDayIndex]);

    useEffect(() => {
        if (selectedSchedule !== undefined) {
            console.log(selectedSchedule);
            setStartSchedule(true); // start the schedule
        }
    }, [selectedSchedule]);


    return (
        <>  
            <div className="routine-runner-container">
                { !startSchedule ?
                    <ScheduleSelector 
                        schedules={schedules} setSelectedSchedule={setSelectedSchedule} 
                        currSchedIndex={currSchedIndex} setCurrSchedIndex={setCurrSchedIndex}
                        currDayIndex={currDayIndex} setCurrDayIndex={setCurrDayIndex}   
                    /> 
                    :
                    <div>
                        {`Starting schedule:
                        ${selectedSchedule?.name} 
                        ${selectedSchedule?.routineLengthMinutes} minutes`}
                    </div>
                }
            </div>
        </>
    )
}