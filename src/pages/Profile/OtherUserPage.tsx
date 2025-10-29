import { useParams } from "react-router";
import OtherUserProfile from "../../components/OtherUserProfile/OtherUserProfile";
import { useMe } from "../../hooks/useMe";

function OtherUserPage() {
  const params = useParams();
  const userId = params.id ? parseInt(params.id, 10) : NaN;
  const { user: me } = useMe();

  if (isNaN(userId)) return <div>Invalid user id</div>;

  return <OtherUserProfile userId={userId} currentUserId={me?.id || 0} />;
}

export default OtherUserPage;
