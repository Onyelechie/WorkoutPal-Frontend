import "./UserAchievementCard.css";
import type { UserAchievementUnlocked } from "../../types/api";
import { notYetImplemented } from "../../utils/construction";
import { AchievementCard } from "./AchievementCard";

type UserAchievementProps = {
  userAchievement: UserAchievementUnlocked;
};

export function UserAchievementCard({ userAchievement }: UserAchievementProps) {
  return (
    <div className="user-achievement-card" onClick={notYetImplemented}>
      <p>{userAchievement.username} Achieved</p>
      <AchievementCard achievement={userAchievement} />
      <p>{new Date(userAchievement.date).toLocaleDateString()}</p>
    </div>
  );
}
