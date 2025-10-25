import { useState } from "react";
import "./ProfileCard.css";
import { relationshipService } from "../../services/relationshipService";
import type { User } from "../../services/relationshipService";

interface ProfileCardProps {
  avatar: string;
  name: string;
  username: string;
  email: string;
  userId: number;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
}

function ProfileCard({ 
  avatar, 
  name, 
  username, 
  email, 
  userId,
  postsCount = 0, 
  followersCount = 0, 
  followingCount = 0
}: ProfileCardProps) {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [loadingFollowing, setLoadingFollowing] = useState(false);

  const handleShowFollowers = async () => {
    setShowFollowers(true);
    setLoadingFollowers(true);
    const followersData = await relationshipService.getFollowers(userId);
    setFollowers(followersData);
    setLoadingFollowers(false);
  };

  const handleShowFollowing = async () => {
    setShowFollowing(true);
    setLoadingFollowing(true);
    const followingData = await relationshipService.getFollowing(userId);
    setFollowing(followingData);
    setLoadingFollowing(false);
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <img className="avatar" src={avatar} alt="User Avatar" />
          <div className="profile-info">
            <h1 className="name">{name}</h1>
            <h3 className="username">@{username}</h3>
            <p className="email">{email}</p>
          </div>
        </div>
        
        <div className="social-stats">
          <div className="stat-item">
            <span className="stat-number">{postsCount}</span>
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

      {/* Followers Modal */}
      {showFollowers && (
        <div className="modal-overlay" onClick={() => setShowFollowers(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Followers</h2>
              <button className="close-btn" onClick={() => setShowFollowers(false)}>×</button>
            </div>
            <div className="user-list">
              {loadingFollowers ? (
                <p>Loading followers...</p>
              ) : (
                <>
                  {followers.map(user => (
                    <div key={user.id} className="user-item">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-username">@{user.username}</span>
                      </div>
                    </div>
                  ))}
                  {followers.length === 0 && <p>No followers yet</p>}
                </>
              )}
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
              <button className="close-btn" onClick={() => setShowFollowing(false)}>×</button>
            </div>
            <div className="user-list">
              {loadingFollowing ? (
                <p>Loading following...</p>
              ) : (
                <>
                  {following.map(user => (
                    <div key={user.id} className="user-item">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-username">@{user.username}</span>
                      </div>
                    </div>
                  ))}
                  {following.length === 0 && <p>Not following anyone yet</p>}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCard;
