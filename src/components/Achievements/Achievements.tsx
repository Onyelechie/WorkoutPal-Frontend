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

export default function Achievements() {
  const [completed, setCompleted] = useState<UserAchievementUnlocked[]>([]);
  const [incomplete, setIncomplete] = useState<UserAchievementLocked[]>([]);

  useEffect(() => {
    async function fetchAchievements() {
      const completedAchievements = await getUnlockedAchievements();
      setCompleted(completedAchievements);

      const incompleteAchievements = await getLockedAchievements();

      setIncomplete(incompleteAchievements);
      setIncomplete((prev) => [...prev, ...mockLockedAchievements]);
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
