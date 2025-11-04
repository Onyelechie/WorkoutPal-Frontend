import { unlockAchievement as unlockAchievementService } from "../services/achievementService";
import { useAlertDialog } from "./useDialog";


export function useAchievement() {
    const { showAlert } = useAlertDialog();

    async function unlockAchievement(userId: number, achievementId: number) {
        const data = await unlockAchievementService(userId, achievementId);
        if (data) {
            showAlert(`Achievement Unlocked: ${data.badgeIcon} ${data.title}`, data.description);
        }
    }

    return { unlockAchievement };
}