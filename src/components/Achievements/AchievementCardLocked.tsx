import type { UserAchievementLocked } from "../../types/api";
import "./AchievementCard.css";

type AchievementIncompleteProp = {
  achievement: UserAchievementLocked;
  completed: boolean;
};

export function AchievementCardLocked({
  achievement,
}: AchievementIncompleteProp) {
  return (
    <div className="achievement-card" key={achievement.id}>
      <div className="badge">{achievement.badgeIcon}</div>

      <div className="achievement-content">
        <h3 className="achievement-title">{achievement.title}</h3>
        <p className="achievement-description">{achievement.description}</p>
        <small className="achievement-tracker">You can do it!</small>
      </div>
    </div>
  );
}
