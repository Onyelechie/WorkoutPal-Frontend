import { useState, useEffect } from "react";
import { relationshipService } from "../../../services/relationshipService";
import { getRequest } from "../../../utils/apiRequests";
import { postService } from "../../../services/postService";
import { userService } from "../../../services/userService";
import type { User, Post } from "../../../types/api";
import type { User as RelationshipUser } from "../../../services/relationshipService";
import { PostCard } from "../../PostCard/PostCard";
import { useNavigate } from "react-router-dom";

interface OtherUserProfileProps {
  userId?: number;
  username?: string;
  currentUserId: number;
}

function OtherUserProfile({ userId, username, currentUserId }: OtherUserProfileProps) {
  const [resolvedUserId, setResolvedUserId] = useState<number | null>(userId || null);
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followers, setFollowers] = useState<RelationshipUser[]>([]);
  const [following, setFollowing] = useState<RelationshipUser[]>([]);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followRequestStatus, setFollowRequestStatus] = useState<string | null>(null); // pending, accepted, rejected, null
  const navigate = useNavigate();

  // Effect to resolve username to userId if needed
  useEffect(() => {
    const resolveUserId = async () => {
      if (userId) {
        // We already have userId, use it directly
        setResolvedUserId(userId);
      } else if (username) {
        // Need to resolve username to userId
        try {
          const id = await userService.getUserIdByUsername(username);
          if (id) {
            setResolvedUserId(id);
          } else {
            console.error("User not found:", username);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error resolving username:", error);
          setLoading(false);
        }
      }
    };

    resolveUserId();
  }, [userId, username]);

  // Effect to fetch profile data once we have a resolved user ID
  useEffect(() => {
    if (resolvedUserId) {
      fetchUserProfile();
      fetchFollowCounts();
      checkFollowStatus();
      checkFollowRequestStatus();
    }
  }, [resolvedUserId, currentUserId]);

  const fetchUserPosts = async () => {
    if (!resolvedUserId) return;
    try {
      setPostsLoading(true);
      const posts = await postService.getUserPosts(resolvedUserId);
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

  const fetchFollowCounts = async () => {
    if (!resolvedUserId) return;
    try {
      const [followersData, followingData] = await Promise.all([
        relationshipService.getFollowers(resolvedUserId),
        relationshipService.getFollowing(resolvedUserId),
      ]);

      setFollowersCount(followersData.length);
      setFollowingCount(followingData.length);
    } catch (error) {
      console.error("Error fetching follow counts:", error);
      setFollowersCount(0);
      setFollowingCount(0);
    }
  };

  const checkFollowRequestStatus = async () => {
    if (!resolvedUserId) return;
    try {
      const status = await relationshipService.getFollowRequestStatus(
        resolvedUserId,
        currentUserId
      );
      setFollowRequestStatus(status?.status || null);
    } catch (error) {
      setFollowRequestStatus(null);
    }
  };

  const fetchUserProfile = async () => {
    if (!resolvedUserId) return;
    try {
      const response = await getRequest(`/users/${resolvedUserId}`);
      setUser(response.data);
      setIsPrivateProfile(false);
      setFollowRequestStatus(null);
      // Always fetch posts - backend will handle privacy logic
      fetchUserPosts();
    } catch (error) {
      // Handle private profile (403) distinctly
      const status = (error as any)?.response?.status;
      const data = (error as any)?.response?.data;
      
      if (status === 403) {
        setIsPrivateProfile(true);
        
        // If backend sends basic user info, use it
        if (data?.user) {
          setUser({
            id: data.user.id,
            name: data.user.name,
            username: data.user.username,
            avatar: data.user.avatar,
          } as any);
        }
        // For private profiles, don't fetch posts - they won't be accessible
        setUserPosts([]);
      } else {
        console.error("Error fetching user profile:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async () => {
    if (!resolvedUserId) return;
    try {
      const followingData =
        await relationshipService.getFollowing(currentUserId);
      const following = followingData.some((u) => u.id === resolvedUserId);
      console.log(`Checking follow status: currentUser=${currentUserId}, viewedUser=${resolvedUserId}, isFollowing=${following}`, followingData);
      setIsFollowing(following);
    } catch (error) {
      console.error("Error checking follow status:", error);
      setIsFollowing(false);
    }
  };

  const handleFollowToggle = async () => {
    setFollowLoading(true);
    try {
      // Handle pending follow request: treat click as a re-request (nudge) instead of cancellation
      if (followRequestStatus === "pending") {
        console.log(`Re-sending (nudging) follow request to user ${resolvedUserId}`);
        const success = await relationshipService.sendFollowRequest(resolvedUserId!, currentUserId);
        if (success) {
          // status remains pending; timestamp updated server-side
          setFollowRequestStatus("pending");
        } else {
          console.warn("Nudge failed; refreshing status");
          await checkFollowRequestStatus();
        }
        setFollowLoading(false);
        return;
      }

      if (isFollowing) {
        console.log(`Unfollowing user ${resolvedUserId}`);
        await relationshipService.unfollowUser(resolvedUserId!, currentUserId);
        setIsFollowing(false);
        console.log(`Set isFollowing to false`);

        // Optimistically update viewed user's followers list
        setUser((prev) => {
          if (!prev) return prev;
          const prevFollowers = Array.isArray(prev.followers)
            ? [...prev.followers]
            : [];
          const newFollowers = prevFollowers.filter(
            (id) => id !== currentUserId,
          );
          return { ...prev, followers: newFollowers } as User;
        });
        // notify other parts of the app to refresh current user's data (following count)
        window.dispatchEvent(new Event("me:refresh"));
        
        // Refresh posts after unfollowing (may hide posts for private profiles)
        fetchUserPosts();
      } else {
        // Check if the profile is private (handle both full data and 403-limited data)
        // Bug fix: previously relied only on user?.isPrivate, which is undefined on 403 private profile partial payload
        // causing a direct follow instead of a follow request.
        if (isPrivateProfile || user?.isPrivate) {
          // Send follow request instead of direct follow
          console.log(`Sending follow request to user ${resolvedUserId}`);
          const success = await relationshipService.sendFollowRequest(resolvedUserId!, currentUserId);
          if (success) {
            setFollowRequestStatus("pending");
            console.log(`Follow request sent`);
          } else {
            console.warn("Follow request failed or already exists; refreshing status");
            await checkFollowRequestStatus();
          }
        } else {
          // Public profile: direct follow
          console.log(`Following user ${resolvedUserId}`);
          await relationshipService.followUser(resolvedUserId!, currentUserId);
          setIsFollowing(true);
          console.log(`Set isFollowing to true`);

          // Optimistically update viewed user's followers list
          setUser((prev) => {
            if (!prev) return prev;
            const prevFollowers = Array.isArray(prev.followers)
              ? [...prev.followers]
              : [];
            // avoid duplicate
            const newFollowers = prevFollowers.includes(currentUserId)
              ? prevFollowers
              : [...prevFollowers, currentUserId];
            return { ...prev, followers: newFollowers } as User;
          });
          // notify other parts of the app to refresh current user's data (following count)
          window.dispatchEvent(new Event("me:refresh"));
          
          // Refresh posts after following (may show posts for private profiles)
          fetchUserPosts();
        }
      }
      // also refresh viewed profile from server in background to reconcile
      fetchUserProfile();
      // refresh the counts after follow/unfollow
      fetchFollowCounts();
      // Don't recheck follow status here - we already set it optimistically above
      // and rechecking might revert to stale server data
    } catch (error) {
      console.error("Error toggling follow:", error);
      // On error, recheck the actual status
      await checkFollowStatus();
    } finally {
      setFollowLoading(false);
    }
  };

  const handleShowFollowers = async () => {
    setShowFollowers(true);
    const followersData = await relationshipService.getFollowers(resolvedUserId!);
    setFollowers(followersData as RelationshipUser[]);
  };

  const handleShowFollowing = async () => {
    setShowFollowing(true);
    const followingData = await relationshipService.getFollowing(resolvedUserId!);
    setFollowing(followingData as RelationshipUser[]);
  };

  const handleUserClick = (clickedUserId: number) => {
    // Close the modals
    setShowFollowers(false);
    setShowFollowing(false);
    // Navigate to the clicked user's profile
    navigate(`/users/${clickedUserId}`);
  };

  // Show skeleton loading when we don't have user data yet
  if (loading || !user) {
    return (
      <div className="profile-page-container flex-row">
        <div className="profile-container">
          <div className="profile-header">
            <div className="avatar skeleton-avatar"></div>
            <div className="profile-info">
              <div className="skeleton-name"></div>
              <div className="skeleton-username"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>

          <div className="social-stats">
            <div className="stat-item">
              <div className="skeleton-stat-number"></div>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <div className="skeleton-stat-number"></div>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <div className="skeleton-stat-number"></div>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>

        {/* Skeleton for metrics */}
        <div className="stats-container">
          <div className="skeleton-section-title"></div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="skeleton-stat-value"></div>
              <span className="stat-title">Age</span>
            </div>
            <div className="stat-card">
              <div className="skeleton-stat-value"></div>
              <span className="stat-title">Height</span>
            </div>
            <div className="stat-card">
              <div className="skeleton-stat-value"></div>
              <span className="stat-title">Weight</span>
            </div>
          </div>
        </div>

        {/* Skeleton for posts */}
        <div className="posts-section">
          <div className="skeleton-section-title"></div>
          <div className="posts-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="post-card skeleton-post">
                <div className="post-header">
                  <div className="skeleton-username-small"></div>
                  <div className="skeleton-date"></div>
                </div>
                <div className="skeleton-post-title"></div>
                <div className="skeleton-post-content"></div>
                <div className="skeleton-post-content"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isPrivateProfile) {
    return (
      <div className="profile-page-container flex-row">
        <div className="profile-container">
          <div className="profile-header">
          {user?.avatar ? (
            <img className="avatar" src={user.avatar} alt="User Avatar" />
          ) : (
            <div className="avatar avatar-placeholder">🔒</div>
          )}
          <div className="profile-info">
            <h1 className="name">{user?.name || "Private Profile"}</h1>
            <h3 className="username">@{user?.username || "private"}</h3>
            <button
              className={`follow-btn ${
                followRequestStatus === "pending"
                  ? "requested"
                  : isFollowing
                  ? "following"
                  : "follow"
              }`}
              style={{ marginTop: '15px' }}
              onClick={handleFollowToggle}
              disabled={followLoading}
            >
              {followLoading
                ? "..."
                : followRequestStatus === "pending"
                ? "Requested"
                : isFollowing
                ? "Unfollow"
                : "Request"}
            </button>
          </div>
        </div>

        <div className="social-stats">
          <div className="stat-item">
            <span className="stat-number">{userPosts.length}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item" onClick={handleShowFollowers}>
            <span className="stat-number">{followersCount}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item" onClick={handleShowFollowing}>
            <span className="stat-number">{followingCount}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>

        {/* User Metrics Section - only show if authorized */}
        {user && (user.age > 0 || user.height > 0 || user.weight > 0) && (
          <div className="stats-container">
            <h3 className="section-title">Metrics</h3>
            <div className="stats-grid">
              {user.age > 0 && (
                <div className="stat-card">
                  <span className="stat-value">{user.age}</span>
                  <span className="stat-title">Age</span>
                </div>
              )}
              {user.height > 0 && (
                <div className="stat-card">
                  <span className="stat-value">{user.height}</span>
                  <span className="stat-title">Height ({user.heightMetric || 'cm'})</span>
                </div>
              )}
              {user.weight > 0 && (
                <div className="stat-card">
                  <span className="stat-value">{user.weight}</span>
                  <span className="stat-title">Weight ({user.weightMetric || 'kg'})</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Followers Modal */}
        {showFollowers && (
          <div className="modal-overlay" onClick={() => setShowFollowers(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Followers</h2>
                <button className="close-btn" onClick={() => setShowFollowers(false)}>
                  ×
                </button>
              </div>
              <div className="user-list">
                {followers.map((user) => (
                  <div key={user.id} className="user-item" onClick={() => handleUserClick(user.id)}>
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-username">@{user.username}</span>
                    </div>
                  </div>
                ))}
                {followers.length === 0 && <p>No followers yet</p>}
              </div>
            </div>
          </div>
        )}

        {/* Following Modal */}
        {showFollowing && (
          <div className="modal-overlay" onClick={() => setShowFollowing(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Following</h2>
                <button className="close-btn" onClick={() => setShowFollowing(false)}>
                  ×
                </button>
              </div>
              <div className="user-list">
                {following.map((user) => (
                  <div key={user.id} className="user-item" onClick={() => handleUserClick(user.id)}>
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-username">@{user.username}</span>
                    </div>
                  </div>
                ))}
                {following.length === 0 && <p>Not following anyone yet</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!user) return <div className="error">User not found</div>;

  console.log(`Rendering OtherUserProfile: userId=${userId}, currentUserId=${currentUserId}, isFollowing=${isFollowing}`);

  return (
    <div className="profile-page-container flex-row">
      <div className="profile-container">
        <div className="profile-header">
          {user.avatar ? (
            <img className="avatar" src={user.avatar} alt="User Avatar" />
          ) : (
            <div className="avatar avatar-placeholder">👤</div>
          )}
          <div className="profile-info">
            <h1 className="name">{user.name}</h1>
            <h3 className="username">@{user.username}</h3>
            <button
              className={`follow-btn ${
                followRequestStatus === "pending"
                  ? "requested"
                  : isFollowing
                  ? "following"
                  : "follow"
              }`}
              style={{ marginTop: '15px' }}
              onClick={handleFollowToggle}
              disabled={followLoading}
            >
              {followLoading
                ? "..."
                : followRequestStatus === "pending"
                ? "Requested"
                : isFollowing
                ? "Unfollow"
                : user.isPrivate
                ? "Request"
                : "Follow"}
            </button>
          </div>
        </div>

        <div className="social-stats">
          <div className="stat-item">
            <span className="stat-number">{userPosts.length}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item" onClick={handleShowFollowers}>
            <span className="stat-number">{followersCount}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item" onClick={handleShowFollowing}>
            <span className="stat-number">{followingCount}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>

        <div className="posts-section">
          <h2 className="section-title">Posts</h2>
          <div className="profile-posts-list">
            {postsLoading && <div>Loading posts...</div>}
            {!postsLoading && userPosts.length > 0 ? (
              userPosts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              !postsLoading && (
                <div className="no-posts">
                  {user?.isPrivate && !isFollowing ? 
                    "This user's posts are private. Follow them to see their posts." : 
                    "No posts yet."
                  }
                </div>
              )
            )}
          </div>
        </div>

        {/* User Metrics Section - only show if authorized */}
        {user && (user.age > 0 || user.height > 0 || user.weight > 0) && (
          <div className="stats-container">
            <h3 className="section-title">Metrics</h3>
            <div className="stats-grid">
              {user.age > 0 && (
                <div className="stat-card">
                  <span className="stat-value">{user.age}</span>
                  <span className="stat-title">Age</span>
                </div>
              )}
              {user.height > 0 && (
                <div className="stat-card">
                  <span className="stat-value">{user.height}</span>
                  <span className="stat-title">Height ({user.heightMetric || 'cm'})</span>
                </div>
              )}
              {user.weight > 0 && (
                <div className="stat-card">
                  <span className="stat-value">{user.weight}</span>
                  <span className="stat-title">Weight ({user.weightMetric || 'kg'})</span>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Followers Modal */}
      {showFollowers && (
        <div className="modal-overlay" onClick={() => setShowFollowers(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Followers</h2>
              <button
                className="close-btn"
                onClick={() => setShowFollowers(false)}
              >
                ×
              </button>
            </div>
            <div className="user-list">
              {followers.map((user) => (
                <div
                  key={user.id}
                  className="user-item"
                  onClick={() => handleUserClick(user.id)}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-username">@{user.username}</span>
                  </div>
                </div>
              ))}
              {followers.length === 0 && <p>No followers yet</p>}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="modal-overlay" onClick={() => setShowFollowing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Following</h2>
              <button
                className="close-btn"
                onClick={() => setShowFollowing(false)}
              >
                ×
              </button>
            </div>
            <div className="user-list">
              {following.map((user) => (
                <div
                  key={user.id}
                  className="user-item"
                  onClick={() => handleUserClick(user.id)}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-username">@{user.username}</span>
                  </div>
                </div>
              ))}
              {following.length === 0 && <p>Not following anyone yet</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OtherUserProfile;
