import "./AchievementCard.css";
import type { Achievement } from "../../types/api";
import { notYetImplemented } from "../../utils/construction";

type AchievementProps = {
  achievement: Achievement;
};

export function AchievementCard({ achievement }: AchievementProps) {
  return (
    <div className="achievement-card" onClick={notYetImplemented}>
      <p>{achievement.username} Achieved</p>
      <div className="achievement-holder" title={achievement.description}>
        <p>{achievement.badgeIcon + " " + achievement.title}</p>
      </div>
      <p>{new Date(achievement.date).toISOString().split("T")[0]}</p>
    </div>
  );
}
