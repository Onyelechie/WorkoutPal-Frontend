import { useEffect, useState } from "react";
import { type Exercise, type Routine, type Schedule, type UserExerciseSettings } from "../../../../types/api";
import { getRequest } from "../../../../utils/apiRequests";
import { formatMs, getTodayIndex } from "../../../../utils/dateTime";
import { useErrorHandler } from "../../../../hooks/useErrorHandler";
import ScheduleSelector from "./ScheduleSelector";
import clsx from "clsx";

import "./RoutineRunner.css";
import { useTime } from "../../../../hooks/useTime";
import ExerciseSettingsModal from "./ExerciseSettingsModal";
import { EXERCISE_SETTINGS_FETCH_FAIL, EXERCISES_FETCH_FAIL, ROUTINE_FETCH_FAIL, SCHEDULE_FETCH_FAIL } from "../../../../app/constants/genericErrors";
import { routineService } from "../../../../services/routineService";

export default function RoutineRunner() {

    const { alertOnRequestError } = useErrorHandler();
    const { countdown, startCountdown, stopCountdown, resetCountdown, setCountdownMs:setBreakTimer,
        stopwatch, startStopwatch,stopStopwatch, resetStopwatch,
     } = useTime();

    const [isLoading, setIsLoading] = useState(true);

    const today = getTodayIndex();
    const [currDayIndex, setCurrDayIndex] = useState(today);

    // settings modal states
    const [openSettings, setOpenSettings] = useState(false);
    function showSettingsModal() {
        setOpenSettings(true);
    }
    function closeSettingsModal() {
        setOpenSettings(false);
    }

    // schedule states
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>(undefined);

    // routine states
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [currRoutineIndex, setCurrRoutineIndex] = useState(0);

    // exercise states
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [currExerciseIndex, setCurrExerciseIndex] = useState(0);
    const defaultExerciseSettings = {
        weight: 10,
        reps: 6,
        sets: 3,
        breakInterval: 60000,
    }
    const [exerciseSettings, setExerciseSettings] = useState<UserExerciseSettings>(defaultExerciseSettings);

    // routine runner state
    const [startSchedule, setStartSchedule] = useState(false);
    const [onExerciseSet, setOnExerciseSet] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [setCount, setSetCount] = useState(0);

    // button state
    const START_SET = "Start Set";
    const END_SET = "End Set";
    const ON_BREAK = "On Break";
    const [buttonText, setButtonText] = useState(START_SET);

    function incrementExerciseSet() {
        setSetCount(setCount+1);
    }

    function cancelSchedule() {
        setStartSchedule(false);
        setSelectedSchedule(undefined);
    }

    function startExerciseSet() {
        setOnExerciseSet(true);
        incrementExerciseSet();
        resetStopwatch();
        startStopwatch();
        setButtonText(END_SET);
    }

    function stopExerciseSet() {
        setOnExerciseSet(false);
        stopStopwatch();
        startBreak();
    }

    function startBreak() {
        setOnBreak(true);
        setButtonText(ON_BREAK);
        startCountdown();
    }

    function stopBreak() {
        setOnBreak(false);
        setButtonText(START_SET);
        stopCountdown();
        resetStopwatch();
        resetCountdown();
    }

    async function getSchedulesByDay(dayOfWeek:number) {
        if (dayOfWeek !== null) {
            try {
                const response = await getRequest(`/schedules/of/${dayOfWeek}`);
                if (response.data !== null) setSchedules(response.data);
                else setSchedules([]);
            } catch (error: any) {
                setSchedules([]);
                alertOnRequestError(SCHEDULE_FETCH_FAIL, error);
            }
        } else {
            setSchedules([]);
        }
    }

    async function getRoutinesByIds(ids: number[]) {
        try {
            const routines = await routineService.getRoutinesByIds(ids);
            setRoutines(routines);
        } catch (error: any) {
            setRoutines([]);
            alertOnRequestError(ROUTINE_FETCH_FAIL, error);
        }
    }

    async function getExercisesByIds(ids:number[]) {
        if (ids !== null) {
            try {
                const responses = await Promise.all(
                    ids.map((id) => getRequest(`/exercises/${id}`))
                );
                const exercises: Exercise[] = responses.map((res) => res.data);
                console.log(exercises);
                setExercises(exercises);
            } catch (error: any) {
                setExercises([]);
                alertOnRequestError(EXERCISES_FETCH_FAIL, error);
            }
        } else {
            setExercises([]);
        }
    };

    async function getExerciseSettingsById(routineId:number, exerciseId:number) {
        if (routineId != null && exerciseId != null) {
            const endpoint =  `/exercise-settings?exercise_id=${exerciseId}&workout_routine_id=${routineId}`;
            try {
                const response = await getRequest(endpoint);
                setExerciseSettings(response.data);
                console.log("response for settings: ", response);
            } catch (error: any) {
                if (error.status === 404) {
                    // if no exercise settings found, use default settings
                    setExerciseSettings(defaultExerciseSettings);
                } else {
                    alertOnRequestError(EXERCISE_SETTINGS_FETCH_FAIL, error);
                }
            }
        } else {
            setExerciseSettings(defaultExerciseSettings); // default values
        }
    }
    
    useEffect(() => {
        // get schedule info based on selected day
        setIsLoading(true);
        getSchedulesByDay(currDayIndex);
        setIsLoading(false);
    }, [currDayIndex]);

    useEffect(() => {
        // start the schedule once a schedule has been selected
        // and get the routines associated with the schedule and reset curr routine index to zero
        if (selectedSchedule !== undefined) {
            setStartSchedule(true); // start the schedule
            getRoutinesByIds(selectedSchedule?.routineIds);
            setCurrRoutineIndex(0);
        } else {
            setRoutines([]);
        }
    }, [selectedSchedule]);

    useEffect(() => { 
        // get exercises and reset curr exercise index... 
        // when the schedule has started 
        // or when the routines changes
        // or when the currRoutineIndex changes
        if (startSchedule && routines.length > 0 && routines[currRoutineIndex] !== null) {
            getExercisesByIds(routines[currRoutineIndex]?.exerciseIds);
            setCurrExerciseIndex(0); // reset curr exercise index to zero
        }
    }, [startSchedule, routines, currRoutineIndex]);

    useEffect(() => {
        // update the countdown interval everytime exercise settings change
        if (exerciseSettings !== null) {
            setBreakTimer(exerciseSettings?.breakInterval);
        }
    }, [exerciseSettings]);

    useEffect(() => {
        // update the exercise settings and set count everytime the routines or exercises change
        if (currExerciseIndex !== null && exercises) {
            const routineId = routines[currRoutineIndex]?.id;
            const exerciseId = exercises[currExerciseIndex]?.id;
            
            getExerciseSettingsById(routineId, exerciseId);
            setSetCount(0);
        }
    }, [exercises, currExerciseIndex]);

    useEffect(() => {
        // stop the break when countdown finishes
        if (countdown <= 0 && onBreak) {
            stopBreak();
        }
    }, [countdown]);
   

    return (
        <>  
            <ExerciseSettingsModal open={openSettings} onClose={closeSettingsModal} routineId={routines[currRoutineIndex]?.id} exerciseId={routines[currRoutineIndex]?.exerciseIds[currExerciseIndex]} exerciseSettings={exerciseSettings} setExerciseSettings={setExerciseSettings}/>
            <div className="routine-runner-container">
                { isLoading ? 
                    "Loading.."
                : !startSchedule ?
                    <ScheduleSelector 
                        schedules={schedules} setSelectedSchedule={setSelectedSchedule}
                        currDayIndex={currDayIndex} setCurrDayIndex={setCurrDayIndex}   
                    /> 
                    :
                    <div className="item-container">
                        <div className="runner-header">
                            <button className="cancel-runner-btn" onClick={cancelSchedule}>Cancel</button>
                            <h1>{selectedSchedule?.name}</h1>
                        </div>
                        <label>Routine:</label>
                        <select     
                            name="routine-select"
                            className="routine-select"
                            value={currRoutineIndex}
                            onChange={(e) => {
                                setCurrRoutineIndex(Number(e.target.value));
                            }}
                            disabled={onExerciseSet}
                        >
                            {routines?.map((routine, index) => (
                                <option key={routine.id} value={index}>{routine.name}</option>
                            ))}
                        </select>

                        <label>Exercise:</label>
                        <select     
                            name="exercise-select"
                            className="exercise-select"
                            value={currExerciseIndex}
                            onChange={(e) => {
                                setCurrExerciseIndex(Number(e.target.value));
                            }}
                            disabled={onExerciseSet}
                        >
                            {exercises?.map((exercise, index) => (
                                <option key={exercise.id} value={index}>{exercise.name}</option>
                            ))}
                        </select>

                        <ul className="runner-exercise-settings-list">
                            <li><strong>{exerciseSettings?.sets} sets, {exerciseSettings?.reps} reps</strong></li>
                            <li className="weight-setting">Weight: <strong>{exerciseSettings.weight} lbs</strong></li>
                            <li className="break-timer" style={{color: onBreak ? "red" : "inherit"}}>Break timer: <strong>{formatMs(countdown)}</strong></li>
                            <li style={{color: onExerciseSet ? "green" : "inherit"}}>Set: {setCount}, Time: {formatMs(stopwatch)}</li>
                        </ul>

                        <button className={clsx("runner-btn", {
                            "green" : !onExerciseSet && !onBreak,
                            "red" : onExerciseSet && !onBreak,
                            "blue" : onBreak && !onExerciseSet,
                        })}
                            onClick={ () => {
                                if(onExerciseSet && !onBreak) stopExerciseSet();
                                if(!onExerciseSet && !onBreak) startExerciseSet();
                            }}
                        >
                            {buttonText}
                        </button>
                        
                        {onBreak && <button className="stop-break-btn" onClick={stopBreak}>Stop Break</button>}
                        <button className="edit-settings-btn" onClick={showSettingsModal}>Edit</button>
                    </div>
                }
            </div>
        </>
    )
}