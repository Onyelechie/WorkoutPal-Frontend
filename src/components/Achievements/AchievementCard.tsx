import type { UserAchievementUnlocked } from "../../types/api";
import "./AchievementCard.css";

type AchievementCompleteProp = {
  achievement: UserAchievementUnlocked;
};

export function AchievementCard({ achievement }: AchievementCompleteProp) {
  const formattedDate = new Date(achievement.date).toLocaleDateString();

  return (
    <div className="achievement-card" key={achievement.id}>
      <div className="badge">{achievement.badgeIcon}</div>

      <div className="achievement-content">
        <h3 className="achievement-title">{achievement.title}</h3>
        <p className="achievement-description">{achievement.description}</p>

        <small className="achievement-date">Unlocked: {formattedDate}</small>
      </div>
    </div>
  );
}
