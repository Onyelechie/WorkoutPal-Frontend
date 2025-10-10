import type { Exercise } from "./exercise";

/* Exercises (plural) */
export interface Exercises {
    startTime: number,
    endTime: number,
    count: number,
    sets: number,
    duration: number,
    exercise: Exercise
};
