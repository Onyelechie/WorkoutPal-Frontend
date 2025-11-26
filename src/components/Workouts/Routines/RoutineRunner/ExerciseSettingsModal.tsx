import { useErrorHandler } from "../../../../hooks/useErrorHandler";
import type { UserExerciseSettings } from "../../../../types/api";
import { postRequest, putRequest } from "../../../../utils/apiRequests";
import { getMinutes, getSeconds, minutesAndSecondsToMs } from "../../../../utils/dateTime";
import { useEffect, useState } from "react";
import { buildExerciseSettingPayload } from "../../../../utils/routineHelpers";

interface SettingsModalProps {
  open: boolean; // boolean to trigger the modal
  onClose: () => void; // function to call upon closing the modal
  routineId: number;
  exerciseId: number;
  exerciseSettings: UserExerciseSettings;
  setExerciseSettings: React.Dispatch<React.SetStateAction<UserExerciseSettings>>;
}

export default function ExerciseSettingsModal({open, onClose, routineId, exerciseId, exerciseSettings, setExerciseSettings}:SettingsModalProps) {

  const endpoint =  `/exercise-settings`;

  const { alertOnRequestError } = useErrorHandler();

  const [settings, setSettings] = useState<UserExerciseSettings>(exerciseSettings);

  const [breakIntervalMin, setBreakIntervalMin] = useState(getMinutes(exerciseSettings.breakInterval));
  const [breakIntervalSec, setBreakIntervalSec] = useState(getSeconds(exerciseSettings.breakInterval));

  useEffect(() => {
    // re-initialize break interval minutes and seconds
    if (open) {
      setSettings(exerciseSettings);
      setBreakIntervalMin(getMinutes(exerciseSettings.breakInterval));
      setBreakIntervalSec(getSeconds(exerciseSettings.breakInterval));
    }
  }, [exerciseSettings, open]);

  function updateSettingsState(exerciseSettings: UserExerciseSettings) {
    setExerciseSettings(exerciseSettings);
  }

  async function handleEditSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const payload = buildExerciseSettingPayload(settings, exerciseId, routineId);
      // attempt a put request
      await putRequest(endpoint, payload);
      updateSettingsState(settings);
      onClose();
    } catch (error: any) {
      // if settings dont exist yet, then create it
      if (error.status === 404) {
        createExerciseSettings();
      } else {
        alertOnRequestError("Unable to edit excercise settings", error);
      }
    }
  }

  async function createExerciseSettings() {
    try {
      const payload = buildExerciseSettingPayload(exerciseSettings, exerciseId, routineId);
      await postRequest(endpoint, payload);
      updateSettingsState(settings);
      onClose();
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
                value={settings.sets}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  sets: Number(e.target.value) || 0
                }))}  
              />

              <label className="input-label">Reps</label>
              <input className="text-input" 
                type="text" 
                inputMode="numeric" 
                value={settings.reps}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  reps: Number(e.target.value) || 0
                }))} 
              />

              <label className="input-label">Weight (lbs)</label>
              <input className="text-input" 
                type="text" 
                inputMode="numeric" 
                value={settings.weight}
                onChange={(e) => setSettings(prev => ({
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
                      setBreakIntervalMin(value);
                      setSettings((prev) => ({
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
                      setSettings((prev) => ({
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
