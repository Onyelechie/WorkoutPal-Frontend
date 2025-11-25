import ProfileCard from "../../components/User/ProfileCard/ProfileCard";
import "./ProfilePage.css";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useMe } from "../../hooks/useMe";
import MyWorkouts from "../../components/Workouts/MyWorkouts/MyWorkouts";
import { postRequest } from "../../utils/apiRequests";
import { PostCard } from "../../components/PostCard/PostCard";
import { useState, useEffect } from "react";
import { relationshipService } from "../../services/relationshipService";
import { postService } from "../../services/postService";
import { useConfirmDialog } from "../../hooks/useDialog";
import type { Post } from "../../types/api";

const logoutMsg = {
  title: "Log out of WorkoutPal",
  message: "Do you want to logout?",
  positiveBtn: "Yes, time to rest",
  negativeBtn: "No, still grinding!"
}

function ProfilePage() {
  const { user, isLoading, error, fetchMe } = useMe();
  const { navLogin } = useAppNavigation();
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const { showConfirmSafe } = useConfirmDialog();

  useEffect(() => {
    const fetchFollowData = async () => {
      if (!user?.id) return;

      try {
        const [followersData, followingData] = await Promise.all([
          relationshipService.getFollowers(user.id),
          relationshipService.getFollowing(user.id),
        ]);

        setFollowersCount(followersData.length);
        setFollowingCount(followingData.length);
      } catch (error) {
        console.error("Error fetching follow data:", error);
        setFollowersCount(0);
        setFollowingCount(0);
      }
    };

    fetchFollowData();
  }, [user?.id]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?.id) return;

      try {
        setPostsLoading(true);
        const posts = await postService.getUserPosts(user.id);
        setUserPosts(posts.sort((a: Post, b: Post) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ));
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setUserPosts([]);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchUserPosts();
  }, [user?.id]);

  const handleUserUpdate = async () => {
    // Refresh user data after update
    await fetchMe();
  };

  const handleLogout = async () => {
    if (await showConfirmSafe(logoutMsg.title, logoutMsg.message, logoutMsg.positiveBtn, logoutMsg.negativeBtn))
    {
      try {
        await postRequest("/logout", "");
        navLogin();
      } catch (err) {
        console.error("Logout failed", err);
      }

    }
  };

  return (
    <div className="profile-page-container flex-row">
      <>
        {isLoading && <div>Loading user profile...</div>}
        {error && (
          <div>
            Failed to get user. Login? <button onClick={navLogin}>Login</button>
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
              followersCount={followersCount}
              followingCount={followingCount}
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
                {postsLoading && <div>Loading posts...</div>}
                {!postsLoading && userPosts.length > 0 ? (
                  (showAllPosts ? userPosts : userPosts.slice(0, 3)).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  !postsLoading && <div className="no-posts">No posts yet.</div>
                )}
              </div>
              {!postsLoading && userPosts.length > 3 && (
                <button onClick={() => setShowAllPosts(!showAllPosts)}>
                  {showAllPosts ? "Show Less" : "Show All"}
                </button>
              )}
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
