import "./ActivityFeed.css";
import { useActivity } from "../../hooks/useActivity";
import { PostCard } from "../../components/PostCard/PostCard";
import type { Post, UserAchievementUnlocked, Comment } from "../../types/api";
import { UserAchievementCard } from "../../components/UserAchievementCard/UserAchievementCard";
import { CommentCard } from "../../components/CommentCard/CommentCard";

function mapActivity(activity: Post | Comment | UserAchievementUnlocked) {
  if ("caption" in activity) {
    return <PostCard key={activity.id} post={activity} />;
  } else if ("comment" in activity) {
    return <CommentCard key={activity.id} comment={activity} />;
  } else {
    return <UserAchievementCard key={activity.id} userAchievement={activity} />;
  }
}

function ActivityFeed() {
  const { activity, isLoading, error, fetchActivity } = useActivity();

  return (
    <div className="feed-holder flex-column">
      <h1>Activity</h1>

      <div className="dashboard-action-buttons grouped-buttons">
        <button onClick={fetchActivity} disabled={isLoading}>
          Refresh
        </button>

        {/* Show loading message when its loading. If an error is caught, show a generic try again later message. */}
        {/* If !isLoading and !error, show appropriate message if posts.length == 0, otherwise, show the post cards */}
        {isLoading && <div>Loading...</div>}
        {error && (
          <div>
            Could not get activity at this time. Please try again later.
          </div>
        )}
        {!isLoading && !error && activity.length === 0 && (
          <div>There are no recent activity at this time...</div>
        )}
      </div>
      {
        // if
        activity &&
          activity.length > 0 &&
          !isLoading &&
          !error &&
          // display all posts if there are any
          activity.map((activity: Post | Comment | UserAchievementUnlocked) =>
            mapActivity(activity),
          )
      }
    </div>
  );
}
export default ActivityFeed;
