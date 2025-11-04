import type { Achievement, UserAchievement } from "../../types/api";
import "./AchievementCard.css"

type AchievementCompleteProp = {
    achievement: UserAchievement;
    completed: boolean
};



export function AchievementCard({ achievement, completed }: AchievementCompleteProp) {
    // logic code refactored by ChatGPT
    const info = completed
        // if completed
        ? {
            text: `Unlocked: ${new Date(achievement.earnedAt).toLocaleDateString()}`,
            className: "achievement-date",
        }
        // else
        : {
            text: "Progress %: You got this!",
            className: "achievement-tracker",
        };


    return (
        <div className="achievement-card" key={achievement.id}>
            <div className="badge">{achievement.badgeIcon}</div>

            <div className="achievement-content">
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>

                {/* There are 2 cases here;
                // First case: achievement is completed -> display the date unlocked
                // Second case: achievement is incomplete -> display the progress
                */}
                <small className={info.className}>{info.text}</small>

            </div>
        </div>

    );
}