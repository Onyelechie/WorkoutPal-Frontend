import clsx from "clsx";
import {
  formatApiTime,
  getTodayIndex,
  minutesToHours,
} from "../../../../utils/date";
import type { Schedule, Routine } from "../../../../types/api";
import { useState } from "react";
import EditScheduleModal from "./EditScheduleModal";

interface ScheduleRowProps {
  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<any[]>>;
  routines: Routine[];
  day: string;
  index: number;
}

export function ScheduleRow({
  schedules,
  setSchedules,
  routines,
  day,
  index,
}: ScheduleRowProps) {
  const defaultSchedulePayload = (): Schedule => ({
    id: -1,
    userId: -1,
    name: "",
    dayOfWeek: 0,
    routineIds: [],
    timeSlot: "",
    routineLengthMinutes: 0,
  }); // for initializing schedules state

  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>(
    defaultSchedulePayload,
  );
  const [openEditModal, setOpenEditModal] = useState(false);

  function showEditModal(selected: Schedule) {
    setSelectedSchedule(selected);
    setOpenEditModal(true);
  }
  function closeEditModal() {
    setSelectedSchedule(defaultSchedulePayload());
    setOpenEditModal(false);
  }

  // Get all schedules for this specific day
  const daySchedules = schedules.filter((s) => s.dayOfWeek === index);

  // If no schedules for this day, render an empty row
  if (daySchedules.length <= 0) {
    return (
      <tr
        key={index}
        className={clsx("", {
          "highlight-text": index == getTodayIndex(),
          "table-row-dark": index % 2 == 0,
          "table-row-light": index % 2 !== 0,
        })}
      >
        <td>{day}</td>
        <td colSpan={4}><em>No routines scheduled</em></td>
      </tr>
    );
  } else {
    // if there's at least one schedule, render it
    return (
      <>
        <EditScheduleModal
          selectedSchedule={selectedSchedule}
          setSchedules={setSchedules}
          routines={routines}
          open={openEditModal}
          onClose={closeEditModal}
        />
        {daySchedules.map((schedule, i) => (
          <>
            <tr
              key={`${index}-${i}`}
              className={clsx("", {
                "highlight-text": index == getTodayIndex(),
                "table-row-dark": index % 2 == 0,
                "table-row-light": index % 2 !== 0,
              })}
              onClick={() => {
                showEditModal(schedule);
              }}
            >
              {/* Only show the day cell once per group, using rowSpan */}
              {i === 0 && <td rowSpan={daySchedules.length}>{day}</td>}
              <td>{schedule?.name}</td>
              <td>
                <ol>
                  {schedule?.routineIds
                    ? schedule.routineIds.map((id) => {
                        const routine = routines.find((r) => r.id === id);
                        return routine ? (
                          <li key={id}>{routine.name}</li>
                        ) : (
                          <li key={id}>Routine {id} does not exist</li>
                        );
                      })
                    : "- No routines -"}
                </ol>
              </td>
              <td>{formatApiTime(schedule.timeSlot)}</td>
              <td>
                {schedule?.routineLengthMinutes} minutes (
                {minutesToHours(schedule.routineLengthMinutes)} hours)
              </td>
            </tr>
          </>
        ))}
      </>
    );
  }
}
