import "./RoutineScheduler.css";
import "../Routines.css";

import { useState } from "react";
import { daysLongForm } from "../../../utils/date";
import { useRoutines } from "../../../hooks/useRoutines";
import { ScheduleRow } from "./ScheduleRow";
import { useSchedules } from "../../../hooks/useSchedules";
import { useTime } from "../../../hooks/useTime";
import CreateScheduleModal from "./CreateScheduleModal";

export default function RoutineScheduler() {
  const { routines, isLoading, error: routinesError } = useRoutines();
  const { schedules, setSchedules, error: schedulesError } = useSchedules();
  const { liveDateTime } = useTime();

  const tableColumns = [
    "Day",
    "Routine Name",
    "Routines",
    "Time Slot",
    "Routine Length",
  ];

  const [openCreateModal, setOpenCreateModal] = useState(false);
  function showCreateModal() {
    setOpenCreateModal(true);
  }
  function closeCreateModal() {
    setOpenCreateModal(false);
  }

  return (
    <>
      <CreateScheduleModal
        open={openCreateModal}
        onClose={closeCreateModal}
        routines={routines}
        setSchedules={setSchedules}
      />
      <div>
        <header className="routine-scheduler-header">
          <h2>Schedule your weekly workout routines!</h2>
          <div>
            <button onClick={showCreateModal}>Create schedule</button>
          </div>
        </header>

        <header className="routine-scheduler-time">
          <div>
            Today: {liveDateTime.toLocaleDateString()},{" "}
            {daysLongForm[liveDateTime.getDay()]}, {liveDateTime.getHours()}:
            {liveDateTime.getMinutes()}
          </div>
        </header>

        {isLoading && <p>Loading schedule...</p>}
        {routinesError && <p>{routinesError.message}</p>}
        {schedulesError && <p>{schedulesError.message}</p>}

        <div className="routine-scheduler-table-container">
          <table className="routine-scheduler-table">
            <thead>
              <tr>
                {tableColumns.map((col) => (
                  <th>{col}</th>
                ))}
              </tr>
            </thead>

            {daysLongForm.map((day, index) => (
              <ScheduleRow
                schedules={schedules}
                setSchedules={setSchedules}
                routines={routines}
                day={day}
                index={index}
              />
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
