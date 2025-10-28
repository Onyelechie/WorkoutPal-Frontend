import "./Achievements.css"
import type { Achievement } from "../../types/api";
import { AchievementCard } from "./AchievementCard";


const mockAchievements: Achievement[] = [
	{
		id: 1,
		title: "First Login",
		description: "Log in for the first time.",
		badgeIcon: "🥇",
		earnedAt: "2025-10-01",
		userId: 123,
	},
	{
		id: 2,
		title: "Marathon Runner",
		description: "Complete 100 activities.",
		badgeIcon: "🏃‍♂️",
		earnedAt: "",
		userId: 123,
	},
	{
		id: 3,
		title: "Night Owl",
		description: "Use the app after midnight.",
		badgeIcon: "🦉",
		earnedAt: "2025-09-20",
		userId: 123,
	},
	{
		id: 4,
		title: "Social Butterfly",
		description: "Connect with 5 friends.",
		badgeIcon: "🦋",
		earnedAt: "",
		userId: 123,
	},
	{
		id: 5,
		title: "Consistency is Key",
		description: "Complete a workout routine 5 days in a row",
		badgeIcon: "📶",
		earnedAt: "",
		userId: 123,
	},
];


export default function Achievements() {
	const completed = mockAchievements.filter((a) => a.earnedAt); // if there earnedAt isn't empty then it's already completed
	const incomplete = mockAchievements.filter((a) => !a.earnedAt);

	return (
		<div className="container">
			<h1 className="heading">Achievements</h1>

			<div className="columns">

				{/* --- Completed Achievements --- */}
				<div className="column">
					<div className="completed">
						<h2>Completed ✅</h2>

						{
							completed.map((achievement) => (
								<AchievementCard key={achievement.id} achievement={achievement} completed={true} />
							))
						}

					</div>
				</div>

				{/* --- Incomplete Achievements --- */}
				<div className="column">
					<div className="incomplete">
						<h2>Incomplete ⏳</h2>

						{
							incomplete.map((achievement) => (
								<AchievementCard key={achievement.id} achievement={achievement} completed={false} />
							))
						}

					</div>

				</div>
			</div>
		</div>

	);
};


