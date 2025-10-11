import "./style/Header.css";

function Header() {
  return (
    <>
      <div className="header">
        <img src="src\assets\react.svg" alt="Temp Logo" />
        <h2>WorkoutPal</h2>
        <nav className="navbar">
          <ul className="navbar-list">
            <li>
              <a href="" className="navbar-link">
                Home
              </a>
            </li>
            <li>
              <a href="" className="navbar-link">
                Profile
              </a>
            </li>
            <li>
              <a href="" className="navbar-link">
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default Header;
