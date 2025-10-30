import "./Header.css";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import UserSearch from "../UserSearch/UserSearch";
import { useNavigate } from "react-router";
import logoUrl from "../../assets/react.svg";

function Header() {
  const { navHome, navProfile, navRoutine } = useAppNavigation();
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
        <button className="home-button" onClick={navHome}>Home</button>
        <button className="routine-button" onClick={navRoutine}>Routine</button>
      </div>

      <div className="header-center">
        <UserSearch onUserSelect={handleUserSelect} />
      </div>

      <div className="header-right">
        <button className="profile-button" onClick={navProfile}>Profile</button>
      </div>
    </header>
  );
}

export default Header;

