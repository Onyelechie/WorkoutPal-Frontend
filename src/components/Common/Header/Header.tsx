import { useState, useEffect } from "react";
import "./Header.css";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import UserSearch from "../../User/UserSearch/UserSearch";
import { useLocation, useNavigate } from "react-router";
import logoUrl from "../../../assets/react.svg";
import { ACHIEVEMENTS_ROUTE, ACTIVITY_ROUTE, HOME_ROUTE, PROFILE_ROUTE, ROUTINE_ROUTE } from "../../../app/AppRoutes";
import { useMe } from "../../../hooks/useMe";
import { relationshipService } from "../../../services/relationshipService";
import FollowRequestsModal from "../../FollowRequests/FollowRequestsModal";

function Header() {
  const { navHome, navProfile, navRoutine, navActivity, navAchievements } =
    useAppNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useMe();
  const [showFollowRequests, setShowFollowRequests] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    if (user?.id) {
      fetchRequestCount();
      
        // Listen for follow request events
        const handleFollowRequestUpdate = () => {
          fetchRequestCount();
        };
      
        window.addEventListener("followRequest:update", handleFollowRequestUpdate);
      
        return () => {
          window.removeEventListener("followRequest:update", handleFollowRequestUpdate);
        };
    }
  }, [user?.id]);

  const fetchRequestCount = async () => {
    if (!user?.id) return;
    const requests = await relationshipService.getPendingFollowRequests(user.id);
    setRequestCount(requests.length);
  };

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
        {/* <button className={`header-button ${isActive(ACTIVITY_ROUTE) ? "active" : ""}`} onClick={navActivity}>
          Activity
        </button> */}
        <button className={`header-button ${isActive(ROUTINE_ROUTE) ? "active" : ""}`} onClick={navRoutine}>
          Routine
        </button>
      </div>

      <div className="header-center">
        <UserSearch onUserSelect={handleUserSelect} />
      </div>

      <div className="header-right">
        {user && (
          <div 
            className="notification-container"
            onMouseEnter={() => setShowFollowRequests(true)}
            onMouseLeave={() => setShowFollowRequests(false)}
          >
            <button 
              className="notification-button" 
              aria-label="Follow requests"
            >
              🔔
              {requestCount > 0 && <span className="notification-badge">{requestCount}</span>}
            </button>
            {showFollowRequests && (
              <FollowRequestsModal 
                userId={user.id} 
                onClose={() => {
                  setShowFollowRequests(false);
                  fetchRequestCount(); // Refresh count after closing
                }} 
              />
            )}
          </div>
        )}
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
