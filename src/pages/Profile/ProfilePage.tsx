import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./ProfilePage.css";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useMe } from "../../hooks/useMe";
import MyWorkouts from "../../components/MyWorkouts/MyWorkouts";
import { postRequest } from "../../utils/apiRequests";
import { PostCard } from "../../components/Dashboard/PostCard";

function ProfilePage() {
  const { user, isLoading, error, fetchMe } = useMe();
  const { navLogin } = useAppNavigation();

  const handleUserUpdate = async () => {
    // Refresh user data after update
    await fetchMe();
  };

  const handleLogout = async () => {
    try {
      await postRequest("/logout", "");
      navLogin();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="profile-page-container flex-row">
      <>
        {isLoading && <div>Loading user profile...</div>}
        {error && (
          <div>
            {error.message} <button onClick={navLogin}>Login</button>
          </div>
        )}
        {user && !isLoading && !error && (
          <>
            <ProfileCard
              avatar={user.avatar}
              name={user.name}
              username={user.username}
              email={user.email}
              userId={user.id}
              postsCount={user.Posts?.length || 0}
              followersCount={user.followers?.length || 0}
              followingCount={user.following?.length || 0}
              user={user}
              onUserUpdate={handleUserUpdate}
            />
            <div className="stats-container">
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-value">{user.age || 0}</span>
                  <span className="stat-title">Age</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{user.height || 0}</span>
                  <span className="stat-title">Height</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{user.weight || 0}</span>
                  <span className="stat-title">Weight</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">
                    {user.heightMetric || "cm"}
                  </span>
                  <span className="stat-title">Height Unit</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">
                    {user.weightMetric || "kg"}
                  </span>
                  <span className="stat-title">Weight Unit</span>
                </div>
              </div>
            </div>

            <div className="posts-section">
              <h2 className="section-title">Posts</h2>
              <div className="profile-posts-list">
                {/* Render user posts similar to home feed using PostCard */}
                {user.Posts && user.Posts.length > 0 ? (
                  user.Posts.map((p: any) => <PostCard key={p.id} post={p} />)
                ) : (
                  <div className="no-posts">No posts yet.</div>
                )}
              </div>
            </div>

            <div className="my-workouts-container">
              <MyWorkouts />
            </div>
          </>
        )}
      </>

      {/* Logout fixed to bottom-right of the profile page */}
      {/* Logout below MyWorkouts, aligned right with spacing */}
      <div className="logout-below">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
