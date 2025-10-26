import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./ProfilePage.css";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useMe } from "../../hooks/useMe";
import MyWorkouts from "../../components/MyWorkouts/MyWorkouts";

function ProfilePage() {
  const { user, isLoading, error, fetchMe } = useMe();
  const { navLogin } = useAppNavigation();

  const handleUserUpdate = async () => {
    // Refresh user data after update
    await fetchMe();
  };

  return (
    <div className="profile-page-container flex-row">
        <>
          {isLoading && <div>Loading user profile...</div>}
          {error && <div>Failed to get user. Login? <button onClick={navLogin}>Login</button></div>}
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
                  <span className="stat-value">{user.heightMetric || 'cm'}</span>
                  <span className="stat-title">Height Unit</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{user.weightMetric || 'kg'}</span>
                  <span className="stat-title">Weight Unit</span>
                </div>
              </div>
            </div>

            <div className="posts-section">
              <h2 className="section-title">Posts</h2>
              <div className="posts-grid">
                {/* Mock posts - replace with actual user posts */}
                {Array.from({length: 6}, (_, i) => (
                  <div key={i} className="post-item">
                    <div className="post-image">
                      <span>Post {i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-workouts-container">
              <MyWorkouts/>
            </div>
          </>
          )}
          
        </>
    </div>
  );
}

export default ProfilePage;
