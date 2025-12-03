import type { Achievement } from "../../types/api";

// sample achievements that may or may not be implemented depending on other features.
export const mockLockedAchievements: Achievement[] = [
  {
    id: 6,
    title: "Consistency is Key (Preview)",
    description: "Complete a workout routine 5 days in a row",
    badgeIcon: "📶",
  },
  {
    id: 7,
    title: "Getting used to it (Preview)",
    description: "Consistently complete any workout routines in a month",
    badgeIcon: "🏋️‍♂️",
  },
  {
    id: 8,
    title: "Gym Extrovert (Preview)",
    description: "Gain 100 Followers",
    badgeIcon: "💯",
  },
  {
    id: 9,
    title: "Social Chatter (Preview)",
    description: "Comment on 100 posts",
    badgeIcon: "🗣️",
  },
];
