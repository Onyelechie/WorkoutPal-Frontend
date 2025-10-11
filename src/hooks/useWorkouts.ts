import { useEffect, useState } from 'react';
import { getRequest } from '../utils/apiRequests';
import type { Workout } from '../types/api';

export function useWorkouts() {

  // init workout and exercise names to rest everyday
  const [workoutNames, setWorkoutNames] = useState<string[]>(["Rest", "Rest", "Rest", "Rest", "Rest", "Rest", "Rest"]);
  const [exerciseNames, setExerciseNames] = useState<string[][]>([[],[],[],[],[],[],[]]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchWorkouts() {
    try {
        setIsLoading(true);
        setError(null); // remove any previous error messages

        const response = (await getRequest('/mock/workouts')) as Workout[];

        // temporarily assign the workouts to every single day
        const MAX_DAYS = 7;
        let wkoutNames = []; // workout names
        let eNames: string[][] = []; // exercise names
        for (let i = 0; i < MAX_DAYS; i++) {
          wkoutNames.push(response[0].name);
          eNames.push([response[0].exercises[0].exercise.name || "-"]); // temporary: only assign the first exercise to every single day
        }

        setWorkoutNames(wkoutNames);
        setExerciseNames(eNames);

    } catch (error:any) {
        console.log("An error occurred");
        console.log(error);
        setError(error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts(); // fetch on mount
  }, []);

  return {
    workoutNames,
    exerciseNames,
    isLoading,
    error,
    fetchWorkouts
  };
}