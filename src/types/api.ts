/* Interfaces for the types of JSON responses we will get from the backend */

import type { LargeNumberLike } from "crypto";

/* ----------------- POSTS ----------------- */
export interface Post {
  id: number;
  postedBy: string;
  title: string;
  caption: string;
  date: string;
  body: string;
  likes: number;
  status: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  commentedBy: string;
  commentedOn: number;
  comment: string;
  date: string;
  parentComment: number;
}
/* ----------------- END OF POSTS ----------------- */

/* ----------------- EXERCISES ----------------- */
/* Exercise (singular) */
export interface Exercise {
  id: number;
  name: string;
  targets: string[];
  intensity: string;
  expertise: string;
  image: string;
  demo: string;
  recommendedCount: number;
  recommendedSets: number;
  recommendedDuration: number;
  custom: boolean;
}

/* Exercises (plural) */
export interface Exercises {
  startTime: number;
  endTime: number;
  count: number;
  sets: number;
  duration: number;
  exercise: Exercise;
}
/* ----------------- END OF EXERCISES ----------------- */

/* ----------------- WORKOUTS ----------------- */
export interface Workout {
  id: number;
  name: string;
  frequency: string;
  nextRound: string;
  exercises: Exercises[];
}
/* ----------------- END OF WORKOUTS ----------------- */

/* ----------------- USERS ----------------- */

export interface Achievement {
  badgeIcon: string;
  description: string;
  date: string;
  id: number;
  title: string;
  userId: number;
  username: string;
}

export interface Goal {
  createdAt: string;
  deadline: string;
  description: string;
  id: number;
  name: string;
  status: string;
  userId: number;
}

export interface Routine {
  createdAt: string;
  description: string;
  Exercises: Exercise[];
  id: number;
  isActive: boolean;
  name: string;
  userId: number;
}

export interface User {
  Achievements: Achievement[];
  age: number;
  avatar: string;
  email: string;
  followers: number[];
  following: number[];
  goals: Goal[];
  googleId: string;
  height: number;
  heightMetric: string;
  id: number;
  isVerified: boolean;
  name: string;
  Posts: Post[];
  provider: string;
  Routines: Routine[];
  username: string;
  weight: number;
  weightMetric: string;
}

/* ----------------- END OF USERS ----------------- */

/* ----------------- SCHEDULE ----------------- */

export interface Schedule {
  id: number;
  name: string;
  userId: number;
  dayOfWeek: number;
  routineIds: number[];
  timeSlot: string;
  routineLengthMinutes: number;
}

/* ----------------- END OF SCHEDULE ----------------- */
