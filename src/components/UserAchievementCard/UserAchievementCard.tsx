import "./UserAchievementCard.css";
import ".././Achievements/AchievementCard.css"
import type { UserAchievementUnlocked } from "../../types/api";

type UserAchievementProps = {
  userAchievement: UserAchievementUnlocked;
};

export function UserAchievementCard({ userAchievement }: UserAchievementProps) {
  return (
    <div className="user-achievement-card">
      <p>{userAchievement.username} Achieved</p>
      <div className="badge" style={{ width: "40px", height: "40px", fontSize: "1.5rem" }}
        >{userAchievement.badgeIcon}
      </div>
      <p>{userAchievement.title}</p>
      <p>{new Date(userAchievement.date).toLocaleDateString()}</p>
    </div>
  );
}
