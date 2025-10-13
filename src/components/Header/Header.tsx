import "./Header.css";
import { useAppNavigation } from "../../hooks/useAppNavigation";

function Header() {

  const { navHome, navProfile, navLogin, navRoutine } = useAppNavigation();


  return (
    <>
      <div className="header">
        <img src="src\assets\react.svg" alt="Temp Logo" />
        <h2>WorkoutPal</h2>
        <nav className="navbar">
          <button onClick={navHome}>Home</button>
          <button onClick={navProfile}>Profile</button>
          <button onClick={navRoutine}>Routine</button>
          <button onClick={navLogin}>Login</button>
        </nav>
      </div>
    </>
  );
}
export default Header;
