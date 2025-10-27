import "./Header.css";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { postRequest } from "../../utils/apiRequests";

function Header() {
  const { navHome, navProfile, navRoutine, navLogin, navAchievements } = useAppNavigation();

  const handleLogout = async () => {
    try {
      await postRequest("/logout", "");
      navLogin();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="header">
      <img src="src/assets/react.svg" alt="Temp Logo" />
      <h2>WorkoutPal</h2>
      <nav className="navbar">
        <button onClick={navHome}>Home</button>
        <button onClick={navProfile}>Profile</button>
        <button onClick={navRoutine}>Routine</button>
        <button onClick={navAchievements}>My Achievements</button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Header;
