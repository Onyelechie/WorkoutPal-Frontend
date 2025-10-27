import './RoutineScheduler.css';

import { useState, useEffect } from 'react';
import { daysLongForm, getTodayIndex } from '../../../utils/date';
import { useRoutines } from '../../../hooks/useRoutines';
import { useMe } from '../../../hooks/useMe';
import { ScheduleRow } from './ScheduleRow';
import { type Schedule } from '../../../types/api';


export default function RoutineScheduler() {

  const { user } = useMe();
  const { routines } = useRoutines();

  const userId = user?.id;

  let schedules:Schedule[] = [];

  // Temporary. Will eventually grab from backend
  if (userId != null) {
    schedules = [
      {id: 1, name: "first routine", userId: userId, dayOfWeek: 0, RoutineIDs: [10, 12], TimeSlot: "12:00", RoutineLength: 120},
      {id: 2, name: "push", userId: userId, dayOfWeek: 1, RoutineIDs: [12], TimeSlot: "1:00", RoutineLength: 120},
      {id: 3, name: "pull", userId: userId, dayOfWeek: 1, RoutineIDs: [12, 13], TimeSlot: "12:00", RoutineLength: 120},
      {id: 4, name: "fourth routine", userId: userId, dayOfWeek: 2, RoutineIDs: [13], TimeSlot: "13:00", RoutineLength: 120},
      {id: 5, name: "fifth routine", userId: userId, dayOfWeek: 4, RoutineIDs: [10], TimeSlot: "12:00", RoutineLength: 120},
      {id: 6, name: "sixth routine", userId: userId, dayOfWeek: 5, RoutineIDs: [12], TimeSlot: "15:00", RoutineLength: 120},
      {id: 7, name: "seventh routine", userId: userId, dayOfWeek: 6, RoutineIDs: [13], TimeSlot: "19:00", RoutineLength: 120},
    ]
  }

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

  return (
    <>
      <div>
        <header className="routine-scheduler-header">
          <h2>Schedule your workout routines!</h2>
          <button>Edit schedule</button>
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
