import { getRequest, postRequest } from "../utils/apiRequests";
import { defaultAchievements } from "../types/achievementTemplate";
import type { Achievement, UnlockAchievement, UserAchievement } from "../types/api";

/* Achievements API */

// Always looking for feedback on refining and refactoring this 
export async function getAchievementsCatalog(): Promise<Achievement[]> {
    try {
        const response = await getRequest("/achievements");
        return response.data;
    }
    catch (error: any) {
        console.error("Error getting achievements", error.response?.data || error.message);
        return [];
    }
}

export async function unlockAchievement(achievementId: number, userId: number): Promise<boolean> {
    const achievementPayload: UnlockAchievement = {
        achievementId,
        userId
    };
    try {
        const response = await postRequest("/achievements", achievementPayload);
        console.log(response.data);
        return true;
    }
    catch (error: any) {
        console.error("Error posting achievements for user", error.response?.data || error.message);
        return false;
    }
}

export async function getUnlockedAchievements(): Promise<UserAchievement[]> {
    try {
        const response = await getRequest("/achievements/unlocked");
        const myAchievements: UserAchievement[] = response.data;
        return myAchievements;
    }
    catch (error: any) {
        console.error("Unable to fetch unlocked achievements: ", error.response?.data || error.message);
        return [];
    }
}

// add more here