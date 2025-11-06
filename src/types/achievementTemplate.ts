export type AchievementTemplate = {
  id: number;
  title: string;
  description: string;
  badgeIcon: string;
};

export const defaultAchievements: AchievementTemplate[] = [
  {
    id: 1,
    title: "Welcome, Pal!",
    description: "Log in for the first time.",
    badgeIcon: "😄",
  },
  {
    id: 2,
    title: "Knowledge Sharing",
    description: "Share a workout routine",
    badgeIcon: "💡",
  },
  {
    id: 3,
    title: "Uplift a WorkoutPal",
    description: "Spread positivity by liking a friend’s workout post",
    badgeIcon: "🚀",
  },
  {
    id: 4,
    title: "Social Butterfly",
    description: "Connect with 5 friends.",
    badgeIcon: "🦋",
  },
  {
    id: 5,
    title: "Consistency is Key",
    description: "Complete a workout routine 5 days in a row",
    badgeIcon: "📶",
  },
  {
    id: 6,
    title: "Start of my Journey",
    description: "Create your first workout routine",
    badgeIcon: "🌄",
  },
  {
    id: 7,
    title: "Gym Extrovert",
    description: "Gain 100 Followers",
    badgeIcon: "💯",
  },
];
