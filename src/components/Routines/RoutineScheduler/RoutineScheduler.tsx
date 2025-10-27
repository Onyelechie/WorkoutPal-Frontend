import './RoutineScheduler.css';

import { useState, useEffect } from 'react';
import { daysLongForm } from '../../../utils/date';
import { useRoutines } from '../../../hooks/useRoutines';
import { ScheduleRow } from './ScheduleRow';
import { useSchedules } from '../../../hooks/useSchedules';
import { postRequest } from '../../../utils/apiRequests';
import type { Schedule } from '../../../types/api';


export default function RoutineScheduler() {

  const { routines } = useRoutines();
  const { schedules } = useSchedules();

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

  // useEffect(() => {

  //   async function postSched() {
  //     try {
  //       const payload = {
  //         dayOfWeek: 1,
  //         name: "Test schedule",
  //         routineIds: [10,13],
  //         routineLengthMinutes: 120,
  //         timeSlot: "13:00"
  //       }
  //       const response = await postRequest("/schedules", payload);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   postSched();
   
  // }, []);

  return (
    <>
      <div>
        <header className="routine-scheduler-header">
          <h2>Schedule your weekly workout routines!</h2>
          <div>
            <button>Edit schedule</button>
            <button>Create schedule</button>
          </div>
        </header>

        <header className="routine-scheduler-time">
          <div>Today: {now.toLocaleDateString()}, {daysLongForm[now.getDay()]}, {now.getHours()}:{now.getMinutes()}</div>
        </header>

        <div className="routine-scheduler-table-container">
          <table className="routine-scheduler-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Routine Name</th>
                <th>Routines</th>
                <th>Time Slot</th>
                <th>Routine Length (mins)</th>
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
