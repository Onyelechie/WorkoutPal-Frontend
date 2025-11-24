import { useParams } from "react-router";
import OtherUserProfile from "../../components/User/OtherUserProfile/OtherUserProfile";
import { useMe } from "../../hooks/useMe";
import "./OtherUserPage.css";

function OtherUserPage() {
  const params = useParams();
  const userId = params.id ? parseInt(params.id, 10) : NaN;
  const { user: me, isLoading } = useMe();

  if (isNaN(userId)) return <div>Cannot find user.</div>;
  
  // Wait for current user to load before rendering profile
  if (isLoading || !me) return <div>Please make sure you are logged in!</div>;

  return (
    <div className="other-user-page-container">
      <OtherUserProfile userId={userId} currentUserId={me.id} />
    </div>
  );
}

export default OtherUserPage;
