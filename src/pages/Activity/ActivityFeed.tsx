import "./ActivityFeed.css";
import { useActivity } from "../../hooks/useActivity";
import { PostCard } from "../../components/PostCard/PostCard";
import type { Post, Achievement, Comment } from "../../types/api";
import { AchievementCard } from "../../components/AchievementCard/AchievmentCard";
import { CommentCard } from "../../components/CommentCard/CommentCard";

const testActivity: (Post | Achievement | Comment)[] = [
  {
    id: 1,
    postedBy: "Jane Doe",
    title: "My First Post",
    caption: "This is a caption for my post",
    date: "2025-10-29",
    body: "Here is the full content of the post.",
    likes: 42,
    status: "What is this?",
    comments: [],
  },
  {
    badgeIcon: "🫠",
    description: "Test achievement description goes here",
    date: "2025-10-25",
    id: 2,
    title: "Test Achievement",
    userId: 1,
    username: "JohnPork",
  },
  {
    id: 4,
    postedBy: "John Smith",
    title: "Another Post",
    caption: "Another caption",
    date: "2025-10-24",
    body: "Full content goes here.",
    likes: 15,
    status: "What is this?",
    comments: [],
  },
];

function mapActivity(activity: Post | Comment | Achievement) {
  if ("caption" in activity) {
    return <PostCard key={activity.id} post={activity} />;
  } else if ("comment" in activity) {
    return <CommentCard key={activity.id} comment={activity} />;
  } else {
    return <AchievementCard key={activity.id} achievement={activity} />;
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
          activity.map((activity: Post | Comment | Achievement) =>
            mapActivity(activity)
          )
      }
      {/* {testActivity.map((activity: Post | Comment | Achievement) =>
        mapActivity(activity)
      )} */}
    </div>
  );
}
export default ActivityFeed;
