import { getRequest, postRequest } from "../utils/apiRequests";
import { defaultAchievements } from "../types/achievementTemplate";
import type { Achievement, UnlockAchievement, UserAchievement } from "../types/api";

/* Achievements API */

// Always looking for feedback on refining and refactoring this 
export async function getAchievementsCatalog(): Promise<Achievement[]> {
    try {
        const response = await getRequest("/achievements");
        console.log("getAchievementsCatalog()");
        console.log(response);
        return response.data;
    }
    catch (error: any) {
        console.error("Error getting achievements", error.response?.data || error.message);
        return [];
    }
}

/**
 * Unlock an achievement, 
 * */
export async function unlockAchievement(achievementId: number, userId: number): Promise<UserAchievement | undefined> {
    const achievementPayload: UnlockAchievement = {
        achievementId,
        userId
    };
    try {
        if (await notUnlocked(achievementId)) {
            const response = await postRequest("/achievements", achievementPayload);
            console.log(response.data);

            return response.data;
        }
        return undefined;
    }
    catch (error: any) {
        console.error("Error posting achievements for user", error);
        return undefined;
    }
}

export async function getUnlockedAchievements(): Promise<UserAchievement[]> {
    try {
        const response = await getRequest("/achievements/unlocked");
        const myAchievements: UserAchievement[] = response.data;
        console.log("getUnlockedAchievements()");
        console.log(myAchievements);
        return myAchievements;
    }
    catch (error: any) {
        console.error("Unable to fetch unlocked achievements: ", error.response?.data || error.message);
        return [];
    }
}

export async function getLockedAchievements(): Promise<UserAchievement[]> {
    try {
        const allAchievements: Achievement[] = (await getRequest("/achievements")).data;
        const unlockedAchievements: UserAchievement[] = await getUnlockedAchievements();
        // Temporary
        const lockedAchievements: UserAchievement[] = allAchievements.filter(
            (ach) => !unlockedAchievements.some((ua) => ua.id === ach.id)
        );
        console.log("getLockedAchievements()");
        console.log(lockedAchievements);
        return lockedAchievements;
    }
    catch (error: any) {
        console.error("Unable to fetch locked achievements: ", error.response?.data || error.message);
        return [];
    }
}

async function notUnlocked(achievementId: number): Promise<boolean> {
    const unlocked = await getUnlockedAchievements();
    return !unlocked.some(ua => ua.id === achievementId);
}

// add more here