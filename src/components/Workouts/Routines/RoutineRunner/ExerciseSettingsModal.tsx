import { useErrorHandler } from "../../../../hooks/useErrorHandler";
import type { UserExerciseSettings } from "../../../../types/api";
import { postRequest, putRequest } from "../../../../utils/apiRequests";
import { getMinutes, getSeconds, minutesAndSecondsToMs } from "../../../../utils/date";
import { useEffect, useState } from "react";

interface SettingsModalProps {
  open: boolean; // boolean to trigger the modal
  onClose: () => void; // function to call upon closing the modal
  routineId: number;
  exerciseId: number;
  exerciseSettings: UserExerciseSettings;
  setExerciseSettings: React.Dispatch<React.SetStateAction<UserExerciseSettings>>;
}

export default function ExerciseSettingsModal({open, onClose, routineId, exerciseId, exerciseSettings, setExerciseSettings}:SettingsModalProps) {

  const { alertOnRequestError } = useErrorHandler();

  const endpoint =  `/exercise-settings`;

  const [breakIntervalMin, setBreakIntervalMin] = useState(getMinutes(exerciseSettings.breakInterval));
  const [breakIntervalSec, setBreakIntervalSec] = useState(getSeconds(exerciseSettings.breakInterval));

  useEffect(() => {
    // re-initialize break interval minutes and seconds
    setBreakIntervalMin(getMinutes(exerciseSettings.breakInterval));
    setBreakIntervalSec(getSeconds(exerciseSettings.breakInterval));
  }, [exerciseSettings]);

  function buildExercisePayload(exerciseSettings: UserExerciseSettings, exerciseId: number, routineId: number) {
    return {
      ...exerciseSettings,
      exerciseId,
      workoutRoutineId: routineId
    };
  }

  async function handleEditSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const payload = buildExercisePayload(exerciseSettings, exerciseId, routineId);
      // attempt a put request
      await putRequest(endpoint, payload);
    } catch (error: any) {
      // if settings dont exist yet, then create it
      if (error.status === 404) {
        createExerciseSettings();
      } else {
        alertOnRequestError("Unable to edit excercise settings", error);
      }
    } finally {
      onClose();
    }
  }

  async function createExerciseSettings() {
    try {
      const payload = buildExercisePayload(exerciseSettings, exerciseId, routineId);
      await postRequest(endpoint, payload);
    } catch (error: any) {
      alertOnRequestError("Unable to add exercise settings", error);
    }
  }

  return (
  <>
    {open && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button onClick={onClose} className="back-button">
            Back
          </button>
          <h2 className="modal-title">Edit exercise settings</h2>
          <form onSubmit={handleEditSettings}>
            <div className="input-group">
              <label className="input-label">Sets</label>
              <input className="text-input" 
                type="text" 
                inputMode="numeric" 
                value={exerciseSettings.sets}
                onChange={(e) => setExerciseSettings(prev => ({
                  ...prev,
                  sets: Number(e.target.value) || 0
                }))}  
              />

              <label className="input-label">Reps</label>
              <input className="text-input" 
                type="text" 
                inputMode="numeric" 
                value={exerciseSettings.reps}
                onChange={(e) => setExerciseSettings(prev => ({
                  ...prev,
                  reps: Number(e.target.value) || 0
                }))} 
              />

              <label className="input-label">Weight (lbs)</label>
              <input className="text-input" 
                type="text" 
                inputMode="numeric" 
                value={exerciseSettings.weight}
                onChange={(e) => setExerciseSettings(prev => ({
                  ...prev,
                  weight: Number(e.target.value) || 0
                }))}   
              />

              <label className="input-label">Break interval</label>
              <div style={{display: "flex", flexDirection: "row", gap: "20px", maxWidth: "200px", textAlign: "center"}}>
                <span>
                  <input className="text-input" 
                    type="text" 
                    inputMode="numeric" 
                    value={breakIntervalMin} 
                    onChange={(e) => {
                      const value = Number(e.target.value) || 0;
                      setBreakIntervalSec(value);
                      setExerciseSettings((prev) => ({
                        ...prev,
                        breakInterval: minutesAndSecondsToMs(value, breakIntervalSec),
                      }));
                    }}
                  /> 
                  <p>minute</p>
                </span>
                <span>
                  <input className="text-input" 
                    type="text" 
                    inputMode="numeric" 
                    value={breakIntervalSec}
                    onChange={(e) => {
                      const value = Number(e.target.value) || 0;
                      setBreakIntervalSec(value);
                      setExerciseSettings((prev) => ({
                        ...prev,
                        breakInterval: minutesAndSecondsToMs(breakIntervalMin, value),
                      }));
                    }}
                  /> 
                  <p>second</p>
                </span>
              </div>

              <div className="action-button-container">
                <button type="submit" className="create-button">Edit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
  )
}
