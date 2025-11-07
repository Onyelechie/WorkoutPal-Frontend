import { useParams } from "react-router";
import OtherUserProfile from "../../components/User/OtherUserProfile/OtherUserProfile";
import { useMe } from "../../hooks/useMe";

function OtherUserPage() {
  const params = useParams();
  const userId = params.id ? parseInt(params.id, 10) : NaN;
  const { user: me } = useMe();

  if (isNaN(userId)) return <div>Cannot find user.</div>;

  if (!me) return <div>Please make sure you are logged in!</div>

  return <OtherUserProfile userId={userId} currentUserId={me.id} />;
}

export default OtherUserPage;
