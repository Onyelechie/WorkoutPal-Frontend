import "./Header.css";
import { useAppNavigation } from "../../hooks/useAppNavigation";

function Header() {

  const { goHome } = useAppNavigation();
  const { Profile } = useAppNavigation();
  const { Login } = useAppNavigation();


  return (
    <>
      <div className="header">
        <img src="src\assets\react.svg" alt="Temp Logo" />
        <h2>WorkoutPal</h2>
        <nav className="navbar">
          <button onClick={goHome}>Home</button>
          <button onClick={Profile}>Profile</button>
          <button onClick={Login}>Login</button>
        </nav>
      </div>
    </>
  );
}
export default Header;
