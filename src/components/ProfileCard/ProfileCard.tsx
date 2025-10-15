import "./ProfileCard.css";

function ProfileCard() {
  return (
    <div className="profile-container">
      <img
        className="profile-avatar"
        src="https://i.pravatar.cc/150?img=3"
        alt="User Avatar"
      />
      <h2 className="profile-name">Jane Doe</h2>
      <p className="profile-email">jane.doe@email.com</p>
      <div className="profile-details">
        <p>Member since: January 2023</p>
        <p>Workouts completed: 42</p>
      </div>
      <button className="profile-edit-btn">Edit Profile</button>
    </div>
  );
}

export default ProfileCard;
