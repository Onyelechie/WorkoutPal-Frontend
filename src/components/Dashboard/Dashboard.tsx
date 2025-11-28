import "./Dashboard.css";
import { useState } from "react";
import { useActivity } from "../../hooks/useActivity.ts";
import { PostCard } from "../PostCard/PostCard.tsx";
import { CreatePost } from "../CreatePost/CreatePost.tsx";
import { UserAchievementCard } from "../UserAchievementCard/UserAchievementCard.tsx";
import { CommentCard } from "../CommentCard/CommentCard.tsx";
import type { Post, UserAchievementUnlocked, Comment } from "../../types/api.ts";
import { useAchievementChecker } from "../../hooks/useAchievementChecker.ts";



function mapActivity(activity: Post | Comment | UserAchievementUnlocked) {
  if ("caption" in activity) {
    return <PostCard key={activity.id} post={activity} />;
  } else if ("comment" in activity) {
    return <CommentCard key={activity.id} comment={activity} />;
  } else {
    return <UserAchievementCard key={activity.id} userAchievement={activity} />;
  }
}

export default function Dashboard() {

  const { activity, isLoading, error, fetchActivity } = useActivity();
  const [showCreatePost, setShowCreatePost] = useState(false);

  useAchievementChecker();


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>

      <div className="dashboard-action-buttons grouped-buttons">
        <button onClick={fetchActivity} disabled={isLoading}>
          Refresh
        </button>
        <button onClick={() => setShowCreatePost(true)}>Create Post</button>
      </div>

      {showCreatePost && (
        <CreatePost
          onPostCreated={() => {
            setShowCreatePost(false);
            fetchActivity();
          }}
          onCancel={() => setShowCreatePost(false)}
        />
      )}

      {/* Show loading message when its loading. If an error is caught, show a generic try again later message. */}
      {/* If !isLoading and !error, show appropriate message if posts.length == 0, otherwise, show the post cards */}
      {isLoading && <div>Loading...</div>}
      {error && <div>Could not get activity at this time. Please try again later.</div>}
      {!isLoading && !error && activity.length === 0 && (
        <div>There is no recent activity at this time...</div>
      )}

      {
        // if
        activity &&
          activity.length > 0 &&
          !isLoading &&
          !error &&
          // display all activity if there are any
          activity.map((item: Post | Comment | UserAchievementUnlocked) =>
            mapActivity(item),
          )
      }
    </div>
  );
}
