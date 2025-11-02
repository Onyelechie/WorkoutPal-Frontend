import { getRequest, postRequest } from "../utils/apiRequests";
import { defaultAchievements } from "../types/achievementTemplate";
import type { Achievement } from "../types/api";
export async function generateAchievements(userID: number) {
    try {
        for (const template of defaultAchievements) {
            const payload = {
                title: template.title,
                description: template.description,
                badgeIcon: template.badgeIcon,
                earnedAt: null,
                userId: userID
            };
            await postRequest("/achievements", payload);
        }
        console.log("Achievement generated for User: " + userID);
    }
    catch (error: any) {
        console.error("❌ Error generating achievements for user", userID, error.response?.data || error.message);
    }
}

export async function getAchievements() {
    try {
        const response = await getRequest("/achievements");
        return response.data;
    }
    catch (error: any) {
        console.error("Error getting achievements for user", error.response?.data || error.message);
        return [];
    }
}

export async function postNewAchievement(achievement: Achievement): Promise<boolean> {
    try {
        const response = await postRequest("/achievements", achievement);
        console.log(response.data);
        return true;
    }
    catch (error: any) {
        console.error("Error posting achievements for user", error.response?.data || error.message);
        return false;
    }
}