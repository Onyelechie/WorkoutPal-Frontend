/* Interfaces for the types of JSON responses we will get from the backend */

/* ----------------- POSTS ----------------- */
export interface Post {
  id: number;
  postedBy: string;
  title: string;
  caption: string;
  date: string;
  content: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  commentedBy: string;
  comment: string;
  date: string;
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
  earnedAt: string;
  id: number;
  title: string;
  userId: number;
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
