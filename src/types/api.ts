/* Interfaces for the types of JSON responses we will get from the backend */

/* ----------------- POSTS ----------------- */
export interface Post {
    id: number,
    postedBy: string,
    title: string,
    caption: string,
    date: string,
    content: string,
    likes: number,
    comments: Comment[]
};

export interface Comment {
    commentedBy: string,
    comment: string,
    date: string
};
/* ----------------- END OF POSTS ----------------- */

/* ----------------- EXERCISES ----------------- */
/* Exercise (singular) */
export interface Exercise {
    id: number,
    name: string,
    targets: string[],
    intensity: string,
    expertise: string,
    image: string,
    demo: string,
    recommendedCount: number,
    recommendedSets: number,
    recommendedDuration: number,
    custom: boolean
};

/* Exercises (plural) */
export interface Exercises {
    startTime: number,
    endTime: number,
    count: number,
    sets: number,
    duration: number,
    exercise: Exercise
};
/* ----------------- END OF EXERCISES ----------------- */


/* ----------------- WORKOUTS ----------------- */
export interface Workout {
    id: number,
    name: string,
    frequency: string,
    nextRound: string,
    exercises: Exercises[]
};
/* ----------------- END OF WORKOUTS ----------------- */