import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "../styles/ProfilePage.css";
import MyWorkouts from "../../components/MyWorkouts/MyWorkouts";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { getRequest } from "../../utils/apiRequests";
import { useState } from "react";

//Horrendous WIP, I'll redo before sprint 1 is due

function ProfilePage() {
  const { navLogin } = useAppNavigation();
  const [user, setUser] = useState(null);

  getRequest("/me")
    .then((response) => {
      if (response.status == 200) {
        console.log("Success");
      } else console.log("Failure");
    })
    .catch((error) => {
      if (error?.response) {
        console.error("Failed to fetch user profile: ", error);
        alert("Failed to fetch user profile: " + error.response.data);
      }
    });

  return (
    <div className="profile-page-container">
      <ProfileCard />
      <div className="flex-column">
        <div className="bio">
          <h2>Bio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat in
            eligendi a laboriosam, veniam nam officiis odit accusantium eum
            deserunt, ex dolorem saepe laudantium quas totam necessitatibus
            dolores voluptatem quis?
          </p>
        </div>
        <div className="stats">
          <h2>Stats</h2>
          <ul>
            <li>Total Workouts: 42</li>
            <li>Average Duration: 45 minutes</li>
            <li>Calories Burned: 12,500</li>
            <li>Miles Ran: 26</li>
          </ul>
        </div>
        <MyWorkouts />
      </div>
    </div>
  );
}

export default ProfilePage;
