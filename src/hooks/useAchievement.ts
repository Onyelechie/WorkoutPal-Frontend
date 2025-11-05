import { unlockAchievement as unlockAchievementService } from "../services/achievementService";
import { getRequest } from "../utils/apiRequests";
import { useAlertDialog } from "./useDialog";


export function useAchievement() {
    const { showAlert } = useAlertDialog();

    async function unlockAchievement(achievementId: number) {
        try{
            const userId = (await getRequest("/me")).data.id;
            const data = await unlockAchievementService(achievementId, userId );
            if (data) {
                showAlert(`Achievement Unlocked: ${data.badgeIcon} ${data.title}`, data.description);
            }
        }
        catch (error: any) {
            console.log("useAchievement(): ", error)
        }
    }

    return { unlockAchievement };
}