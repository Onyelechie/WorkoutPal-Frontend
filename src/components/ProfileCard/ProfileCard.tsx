import "./ProfileCard.css";

interface ProfileCardProps {
  avatar: string;
  name: string;
  username: string;
  email: string;
}
function ProfileCard({ avatar, name, username, email }: ProfileCardProps) {
  return (
    <div className="profile-container">
      <img className="avatar" src={avatar} alt="User Avatar" />
      <h1 className="name">{name}</h1>
      <h3 className="username">@{username}</h3>
      <p className="email">{email}</p>
    </div>
  );
}

export default ProfileCard;
