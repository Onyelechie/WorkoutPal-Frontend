// AchievementManager.ts

import type { Achievement } from "../types/api";


type Observer = () => void;

/**
 * THIS IS A Test
 * no implementation yet
 */
class AchievementManager {
    private achievements: Achievement[] = [];
    private observers: Observer[] = [];

    subscribe(observer: Observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    private notify() {
        this.observers.forEach((observer) => observer());
    }

    getAchievements() {
        return this.achievements;
    }

    setAchievements(achievements: Achievement[]) {
        this.achievements = achievements;
        this.notify();
    }

    addAchievement(achievement: Achievement) {
        this.achievements.push(achievement);
        this.notify();
    }

    completeAchievement(id: number) {
        const achievement = this.achievements.find((a) => a.id === id);
        if (achievement && !achievement.earnedAt) {
            achievement.earnedAt = new Date().toISOString();
            this.notify();
        }
    }
}

// Singleton
export const achievementManager = new AchievementManager();
