import "./AchievementCard.css";
import type { Achievement } from "../../types/api";
import { notYetImplemented } from "../../utils/construction";

type AchievementProps = {
  achievement: Achievement;
};

export function AchievementCard({ achievement }: AchievementProps) {
  return (
    <div
      key={achievement.id}
      className="achievement-card"
      onClick={notYetImplemented}
    >
      <p>{achievement.userId} Achieved</p>
      <div className="achievement-holder" title={achievement.description}>
        <img src={achievement.badgeIcon} alt="Icon" />
        <p>{achievement.title}</p>
      </div>
      <p>{achievement.earnedAt}</p>
    </div>
  );
}
