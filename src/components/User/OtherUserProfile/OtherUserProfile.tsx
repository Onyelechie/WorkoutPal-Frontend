import { useState, useEffect } from "react";
import { relationshipService } from "../../../services/relationshipService";
import { getRequest } from "../../../utils/apiRequests";
import type { User } from "../../../types/api";
import type { User as RelationshipUser } from "../../../services/relationshipService";
import { useMe } from "../../../hooks/useMe";
import { PostCard } from "../../PostCard/PostCard";
import { useNavigate } from "react-router-dom";

interface OtherUserProfileProps {
  userId: number;
  currentUserId: number;
}

function OtherUserProfile({ userId, currentUserId }: OtherUserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followers, setFollowers] = useState<RelationshipUser[]>([]);
  const [following, setFollowing] = useState<RelationshipUser[]>([]);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    checkFollowStatus();
    fetchFollowCounts();
  }, [userId]);

  const fetchFollowCounts = async () => {
    try {
      const [followersData, followingData] = await Promise.all([
        relationshipService.getFollowers(userId),
        relationshipService.getFollowing(userId),
      ]);

      setFollowersCount(followersData.length);
      setFollowingCount(followingData.length);
    } catch (error) {
      console.error("Error fetching follow counts:", error);
      setFollowersCount(0);
      setFollowingCount(0);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await getRequest(`/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async () => {
    try {
      const followingData =
        await relationshipService.getFollowing(currentUserId);
      setIsFollowing(followingData.some((u) => u.id === userId));
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  useMe();

  const handleFollowToggle = async () => {
    setFollowLoading(true);
    try {
      if (isFollowing) {
        await relationshipService.unfollowUser(userId, currentUserId);
        setIsFollowing(false);

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
      } else {
        await relationshipService.followUser(userId, currentUserId);
        setIsFollowing(true);

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
      }
      // also refresh viewed profile from server in background to reconcile
      fetchUserProfile();
      // refresh the counts after follow/unfollow
      fetchFollowCounts();
    } catch (error) {
      console.error("Error toggling follow:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleShowFollowers = async () => {
    setShowFollowers(true);
    const followersData = await relationshipService.getFollowers(userId);
    setFollowers(followersData as RelationshipUser[]);
  };

  const handleShowFollowing = async () => {
    setShowFollowing(true);
    const followingData = await relationshipService.getFollowing(userId);
    setFollowing(followingData as RelationshipUser[]);
  };

  const handleUserClick = (clickedUserId: number) => {
    // Close the modals
    setShowFollowers(false);
    setShowFollowing(false);
    // Navigate to the clicked user's profile
    navigate(`/users/${clickedUserId}`);
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <>
      <div className="other-user-profile">
        <div className="profile-header">
          <img className="avatar" src={user.avatar} alt="User Avatar" />
          <div className="profile-info">
            <h1 className="name">{user.name}</h1>
            <h3 className="username">@{user.username}</h3>
            <button
              className={`follow-btn ${isFollowing ? "following" : "follow"}`}
              onClick={handleFollowToggle}
              disabled={followLoading}
            >
              {followLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>

        <div className="social-stats">
          <div className="stat-item">
            <span className="stat-number">{user.Posts?.length || 0}</span>
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

        <div className="posts-section">
          <h2 className="section-title">Posts</h2>
          <div className="posts-list">
            {user.Posts && user.Posts.length > 0 ? (
              user.Posts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="no-posts">No posts yet.</div>
            )}
          </div>
        </div>
      </div>

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
    </>
  );
}

export default OtherUserProfile;
