import "./Header.css";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import UserSearch from "../../User/UserSearch/UserSearch";
import { useLocation, useNavigate } from "react-router";
import logoUrl from "../../../assets/react.svg";
import { ACHIEVEMENTS_ROUTE, ACTIVITY_ROUTE, HOME_ROUTE, PROFILE_ROUTE, ROUTINE_ROUTE } from "../../../app/AppRoutes";

function Header() {
  const { navHome, navProfile, navRoutine, navActivity, navAchievements } =
    useAppNavigation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserSelect = (user: { id: number }) => {
    navigate(`/users/${user.id}`);
  }; 

  const isActive = (path: string) => location.pathname.startsWith(path);

  console.log(location.pathname);
  return (
    
    <header className="header">
      <div className="header-left">
        <button className="logo-button" onClick={navHome} aria-label="Home">
          <img src={logoUrl} alt="WorkoutPal logo" className="logo-image" />
          <span className="logo-text">WorkoutPal</span>
        </button>
        <div className="vertical-line"></div>
        <button className={`header-button ${isActive(HOME_ROUTE) ? "active" : ""}`} onClick={navHome}>
          Home
        </button>
        <button className={`header-button ${isActive(ACTIVITY_ROUTE) ? "active" : ""}`} onClick={navActivity}>
          Activity
        </button>
        <button className={`header-button ${isActive(ROUTINE_ROUTE) ? "active" : ""}`} onClick={navRoutine}>
          Routine
        </button>
      </div>

      <div className="header-center">
        <UserSearch onUserSelect={handleUserSelect} />
      </div>

      <div className="header-right">
        <button className={`header-button ${isActive(ACHIEVEMENTS_ROUTE) ? "active" : ""}`} onClick={navAchievements}>
          Achievements
        </button>
        <button className={`header-button ${isActive(PROFILE_ROUTE) ? "active" : ""}`} onClick={navProfile}>
          Profile
        </button>
      </div>
    </header>
  );
}

export default Header;
