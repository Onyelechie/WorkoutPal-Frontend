import { useEffect } from "react";
import { AchievementKey } from "../app/constants/achievementKey";
import { relationshipService } from "../services/relationshipService";
import { useAchievement } from "./useAchievement";
import { useMe } from "./useMe";

// only triggers when navigated to Dashboard 
export function useAchievementChecker() {
  const { user } = useMe();
  const achievement = useAchievement();

  useEffect(() => {
    if (!user) return;

    const checkFollowerAchievements = async () => {
      // Gain 5 Followers
      const followers = (await relationshipService.getFollowers(user.id)).length;
      if (followers >= 5) {
        achievement.unlockAchievement(AchievementKey.FIVE_FOLLOWERS);
      }
      
      // Follow 5
      const following = (await relationshipService.getFollowing(user.id)).length;
      if (following >= 5) {
        achievement.unlockAchievement(AchievementKey.FIVE_FOLLOWING);
      }

    };

    checkFollowerAchievements();
  }, [user]);
}
