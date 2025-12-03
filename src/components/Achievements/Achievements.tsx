import "./Achievements.css";
import type {
  UserAchievementLocked,
  UserAchievementUnlocked,
} from "../../types/api";
import { AchievementCard } from "./AchievementCard";
import { AchievementCardLocked } from "./AchievementCardLocked";
import { useEffect, useState } from "react";
import {
  getLockedAchievements,
  getUnlockedAchievements,
} from "../../services/achievementService";
import { mockLockedAchievements } from "./mockAchievements";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { ACHIEVEMENT_FETCH_FAIL_DESCR, ACHIEVEMENT_FETCH_FAIL_TITLE } from "../../app/constants/genericErrors";

export default function Achievements() {
  const [completed, setCompleted] = useState<UserAchievementUnlocked[]>([]);
  const [incomplete, setIncomplete] = useState<UserAchievementLocked[]>([]);
  const { alertOnRequestError } = useErrorHandler();


  useEffect(() => {
    async function fetchAchievements() {
      try {
        const completedAchievements = await getUnlockedAchievements();
        const incompleteAchievements = await getLockedAchievements();
        
        setCompleted(completedAchievements);
        setIncomplete(incompleteAchievements);
        setIncomplete((prev) => [...prev, ...mockLockedAchievements]);

      } catch (err) {
        alertOnRequestError(ACHIEVEMENT_FETCH_FAIL_TITLE, err as any, ACHIEVEMENT_FETCH_FAIL_DESCR);
      }

    }
    fetchAchievements();
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Achievements</h1>

      <div className="columns">
        {/* --- Completed Achievements --- */}
        <div className="column">
          <div className="completed">
            <h2>Completed ✅</h2>

            {completed &&
              completed.map((achievement: any) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
          </div>
        </div>

        {/* --- Incomplete Achievements --- */}
        <div className="column">
          <div className="incomplete">
            <h2>Incomplete ⏳</h2>

            {incomplete &&
              incomplete.map((achievement) => (
                <AchievementCardLocked
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
