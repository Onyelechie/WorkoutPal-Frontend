import type { Achievement } from "../../types/api";

// sample achievements for display, do not send this to the backend
export const mockLockedAchievements: Achievement[] = [
  {
    id: 6,
    title: "Consistency is Key",
    description: "Complete a workout routine 5 days in a row",
    badgeIcon: "📶",
  },
  {
    id: 7,
    title: "Start of my Journey",
    description: "Create your first workout routine",
    badgeIcon: "🌄",
  },
  {
    id: 8,
    title: "Gym Extrovert",
    description: "Gain 100 Followers",
    badgeIcon: "💯",
  },
];
