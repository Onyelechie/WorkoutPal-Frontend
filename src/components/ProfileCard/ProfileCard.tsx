import "./ProfileCard.css";

interface ProfileCardProps {
  avatar: string;
  name: string;
  username: string;
  email: string;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
}

function ProfileCard({ 
  avatar, 
  name, 
  username, 
  email, 
  postsCount = 0, 
  followersCount = 0, 
  followingCount = 0 
}: ProfileCardProps) {
  return (
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
        <div className="stat-item">
          <span className="stat-number">{followersCount}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{followingCount}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
