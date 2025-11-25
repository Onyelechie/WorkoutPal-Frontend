import "./UserAchievementCard.css";
import "./AchievementCard.css"
import type { UserAchievementUnlocked } from "../../types/api";
import { notYetImplemented } from "../../utils/construction";

type UserAchievementProps = {
  userAchievement: UserAchievementUnlocked;
};

export function UserAchievementCard({ userAchievement }: UserAchievementProps) {
  return (
    <div className="user-achievement-card" onClick={notYetImplemented}>
      <p>{userAchievement.username} Achieved</p>
      <div className="badge" style={{ width: "40px", height: "40px", fontSize: "1.5rem" }}
        >{userAchievement.badgeIcon}
      </div>
      <p>{userAchievement.title}</p>
      <p>{new Date(userAchievement.date).toLocaleDateString()}</p>
    </div>
  );
}
