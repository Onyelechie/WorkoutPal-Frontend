import './RoutineScheduler.css';

import { useState, useEffect } from 'react';
import { daysLongForm } from '../../../utils/date';
import { useRoutines } from '../../../hooks/useRoutines';
import { ScheduleRow } from './ScheduleRow';
import { useSchedules } from '../../../hooks/useSchedules';
import CreateScheduleModal from './CreateScheduleModal';


export default function RoutineScheduler() {

  const { routines } = useRoutines();
  const { schedules, setSchedules } = useSchedules();

  const tableColumns = ["Day", "Routine Name", "Routines", "Time Slot", "Routine Length"];

  // live day and time
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update every second
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  function showCreateModal() { setOpenCreateModal(true) };
  function closeCreateModal() { setOpenCreateModal(false) };

  return (
    <>
      <CreateScheduleModal open={openCreateModal} onClose={closeCreateModal} routines={routines} setSchedules={setSchedules}/>
      <div>
        <header className="routine-scheduler-header">
          <h2>Schedule your weekly workout routines!</h2>
          <div>
            <button onClick={showCreateModal}>Create schedule</button>
          </div>
        </header>

        <header className="routine-scheduler-time">
          <div>Today: {now.toLocaleDateString()}, {daysLongForm[now.getDay()]}, {now.getHours()}:{now.getMinutes()}</div>
        </header>

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
              <ScheduleRow schedules={schedules} routines={routines} day={day} index={index}/>
            ))}
          </table>
        </div>


      </div>
    </>
  );
}
