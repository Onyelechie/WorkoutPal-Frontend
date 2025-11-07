import { useParams } from "react-router";
import OtherUserProfile from "../../components/User/OtherUserProfile/OtherUserProfile";
import { useMe } from "../../hooks/useMe";

function OtherUserPage() {
  const params = useParams();
  const userId = params.id ? parseInt(params.id, 10) : NaN;
  const { user: me, isLoading } = useMe();

  if (isNaN(userId)) return <div>Invalid user id</div>;
  
  // Wait for current user to load before rendering profile
  if (isLoading || !me) return <div>Loading...</div>;

  return <OtherUserProfile userId={userId} currentUserId={me.id} />;
}

export default OtherUserPage;
