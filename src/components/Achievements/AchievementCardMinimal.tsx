import "./AchievementCardMinimal.css"
import type { UserAchievementUnlocked } from "../../types/api";

type AchievementCompleteProp = {
  achievement: UserAchievementUnlocked;
  completed: boolean;
};
export function AchievementCardMinimal({ achievement }: AchievementCompleteProp) {

  return (
    <div className="minimal-achievement-card" key={achievement.id}>
      <div className="badge">{achievement.badgeIcon}</div>
      <p>'{achievement.title}'</p>
    </div>
  );
}