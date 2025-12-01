import { useParams } from "react-router";
import OtherUserProfile from "../../components/User/OtherUserProfile/OtherUserProfile";
import { useMe } from "../../hooks/useMe";
import "./OtherUserPage.css";

function OtherUserPage() {
  const params = useParams();
  const { user: me, isLoading } = useMe();

  // Handle both /users/:id and /users/username/:username routes
  const userId = params.id ? parseInt(params.id, 10) : undefined;
  const username = params.username;

  // Must have either userId or username
  if (!userId && !username) {
    return <div>Cannot find user.</div>;
  }
  
  // Wait for current user to load before rendering profile
  if (isLoading || !me) return <div>Please make sure you are logged in!</div>;

  return (
    <div className="other-user-page-container">
      <OtherUserProfile 
        userId={userId} 
        username={username}
        currentUserId={me.id} 
      />
    </div>
  );
}

export default OtherUserPage;
