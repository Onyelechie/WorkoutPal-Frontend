import type { Achievement, UserAchievement } from "../../types/api";
import "./AchievementCard.css"

type AchievementIncompleteProp = {
    achievement: Achievement;
    completed: boolean
};



export function AchievementCardLocked({ achievement, completed }: AchievementIncompleteProp) {


    return (
        <div className="achievement-card" key={achievement.id}>
            <div className="badge">{achievement.badgeIcon}</div>

            <div className="achievement-content">
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
                <small className="achievement-tracker">Progress %</small>

            </div>
        </div>

    );
}