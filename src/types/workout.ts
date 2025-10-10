import type { Exercises } from "./exercises";

export interface Workout {
    id: number,
    name: string,
    frequency: string,
    nextRound: string,
    exercises: Exercises[]
};