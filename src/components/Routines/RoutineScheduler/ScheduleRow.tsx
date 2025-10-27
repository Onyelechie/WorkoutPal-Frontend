import clsx from "clsx"
import { getTodayIndex } from "../../../utils/date"
import type { Schedule } from "../../../types/api";

interface ScheduleRowProps {
    schedules: Schedule[],
    routines: any[],
    day: string,
    index: number,
}

export function ScheduleRow({schedules, routines, day, index}:ScheduleRowProps) {

    // Get all schedules for this specific day
    const daySchedules = schedules.filter(s => s.dayOfWeek === index);

    // If no schedules for this day, render an empty row
    if (daySchedules.length === 0) {
        return (
        <tr 
        key={index} 
        className={clsx(
            "",
            {
            "highlight-text": index == getTodayIndex(),
            "table-row-dark": index%2 == 0
            }
        )}>
            <td>{day}</td>
            <td colSpan={4}>No routines scheduled</td>
        </tr>
        );
    }

    return daySchedules.map((schedule, i) => (
        <tr
        key={`${index}-${i}`}
        className={clsx(
            "",
            {
            "highlight-text": index == getTodayIndex(),
            "table-row-dark": index%2 == 0
            }
        )}
        >
        {/* Only show the day cell once per group, using rowSpan */}
        {i === 0 && (
            <td rowSpan={daySchedules.length}>{day}</td>
        )}
        <td>{schedule.name}</td>
        <td>
            <ol>
            {schedule.RoutineIDs.map(id => {
                const routine = routines.find(r => r.id === id);
                return routine ? <li key={id}>{routine.name}</li> : <li key={id}>Routine {id} does not exist</li>;
            })}
            </ol>
        </td>
        <td>{schedule.TimeSlot}</td>
        <td>{schedule.RoutineLength}</td>
        </tr>
    ));
            
}