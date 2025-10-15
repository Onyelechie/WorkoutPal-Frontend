import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./ProfilePage.css";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useMe } from "../../hooks/useMe";
import MyWorkouts from "../../components/MyWorkouts/MyWorkouts";

function ProfilePage() {
  const { user, isLoading, error } = useMe();
  const { navLogin } = useAppNavigation();

  return (
    <div className="profile-page-container flex-row">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        <>
          Failed to fetch user profile. Login?
          <button onClick={navLogin}>Login</button>
        </>
      ) : user ? (
        <>
          <ProfileCard
            avatar={user.avatar}
            name={user.name}
            username={user.username}
            email={user.email}
          />
          <div className="stats-container">
            <ul className="stats">
              <li>Age: {user.age}</li>
              <li>Height: {user.height}</li>
              <li>Height &#40;Metric&#41; : {user.age}</li>
              <li>Weight: {user.weight}</li>
              <li>Weight &#40;Metric&#41; : {user.age}</li>
            </ul>
          </div>

          <div className="my-workouts-container">
            <MyWorkouts/>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProfilePage;
