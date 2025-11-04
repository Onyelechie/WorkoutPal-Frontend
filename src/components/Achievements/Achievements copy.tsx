import "./Achievements.css"
import type { Achievement, UserAchievement } from "../../types/api";
import { AchievementCard } from "./AchievementCard";
import { deleteRequest, getRequest, postRequest } from "../../utils/apiRequests";
import { mockAchievements } from "./mockAchievements"
import { getUnlockedAchievements } from "../../services/achievementService";
import { useEffect, useState } from "react";


function sortMockAchievements(achievements: UserAchievement[]) {
	const completed = achievements.filter((a) => a.earnedAt); // if there earnedAt isn't empty then it's already completed
	const incomplete = achievements.filter((a) => !a.earnedAt);
	return { completed, incomplete };
}

// async function fetchAchievements(setCompleted: React.Dispatch<React.SetStateAction<UserAchievement[]>>) {
// 	const data = await getUnlockedAchievements();
// 	setCompleted(data);
// }

export default function Achievements() {
	const [completed, setCompleted] = useState<UserAchievement[]>([]);

	useEffect(() => {
		async function fetchAchievements() {
			const completedAchievements = await getUnlockedAchievements();
			setCompleted(completedAchievements);
		}
		fetchAchievements();
	}, []);

	const incomplete = mockAchievements.filter((a) => !a.earnedAt);
	// const { completed, incomplete } = sortMockAchievements(mockAchievements);

	async function testCall() {
		const now = new Date();
		// Format YYYY-MM-DD
		// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
		const dateFormat = now.toISOString().substring(0, 10);
		try {
			const payload = {
				id: 1,
				title: "Welcome, Pal!",
				description: "Log in for the first time.",
				badgeIcon: "😄",
				earnedAt: dateFormat,
				userId: 6,
			};

			const response = await postRequest("/achievements", payload);

			console.log("✅ Server response:", response.data);
		} catch (error: any) {
			console.error("❌ Request failed:", error.response?.data || error.message);
		}

	}
	async function getCall() {
		try {

			const response = await getRequest("/achievements");

			console.log("✅ Server response:", response.data);
		} catch (error: any) {
			console.error("❌ Request failed:", error.response?.data || error.message);
		}
	}
	async function deleteCall() {
		try {

			const response = await deleteRequest(`/achievements/${3}`);

			console.log("✅ Server response:", response.data);
		} catch (error: any) {
			console.error("❌ Request failed:", error.response?.data || error.message);
		}
	}

	return (
		<div className="container">
			<h1 className="heading">Achievements</h1>

			<div className="columns">

				{/* --- Completed Achievements --- */}
				<div className="column">
					<div className="completed">
						<h2>Completed ✅</h2>

						{
							completed && completed.map((achievement: any) => (
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
					<button onClick={testCall}>Test post</button>
					<button onClick={getCall}>Get achievement</button>
					<button onClick={deleteCall}>delete achievement</button>

				</div>
			</div>
		</div >

	);
};


