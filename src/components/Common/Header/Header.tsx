import "./Header.css";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import UserSearch from "../../User/UserSearch/UserSearch";
import { useNavigate } from "react-router";
import logoUrl from "../../../assets/react.svg";

function Header() {
  const { navHome, navProfile, navRoutine, navActivity, navAchievements } =
    useAppNavigation();
  const navigate = useNavigate();

  const handleUserSelect = (user: { id: number }) => {
    navigate(`/users/${user.id}`);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="logo-button" onClick={navHome} aria-label="Home">
          <img src={logoUrl} alt="WorkoutPal logo" className="logo-image" />
          <span className="logo-text">WorkoutPal</span>
        </button>
        <button className="header-button" onClick={navHome}>
          Home
        </button>
        <button className="header-button" onClick={navActivity}>
          Activity
        </button>
        <button className="header-button" onClick={navRoutine}>
          Routine
        </button>
      </div>

      <div className="header-center">
        <UserSearch onUserSelect={handleUserSelect} />
      </div>

      <div className="header-right">
        <button className="header-button" onClick={navProfile}>
          Profile
        </button>
        <button className="achievement-button" onClick={navAchievements}>
          Achievements
        </button>
        <button className="profile-button" onClick={navProfile}></button>
      </div>
    </header>
  );
}

export default Header;
