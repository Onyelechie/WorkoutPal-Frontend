import "./Dashboard.css";
import { notYetImplemented } from "../../utils/construction.ts";
import { usePosts } from "../../hooks/usePosts.ts";
import { PostCard } from "../PostCard/PostCard.tsx";
import type { Post } from "../../types/api.ts";

// MOCK POST (REMOVE)
const testPost: Post[] = [
  {
    id: 1,
    postedBy: "Jane Doe",
    title: "My First Post",
    caption: "This is a caption for my post",
    date: "2025-10-25",
    body: "Here is the full content of the post.",
    likes: 42,
    status: "What is this?",
    comments: [],
  },
  {
    id: 2,
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

export default function Dashboard() {
  const { posts, isLoading, error, fetchPosts } = usePosts();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>

      <div className="dashboard-action-buttons grouped-buttons">
        <button onClick={fetchPosts} disabled={isLoading}>
          Refresh
        </button>
        <button onClick={notYetImplemented}>Create Post</button>
      </div>

      {/* Show loading message when its loading. If an error is caught, show a generic try again later message. */}
      {/* If !isLoading and !error, show appropriate message if posts.length == 0, otherwise, show the post cards */}
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!isLoading && !error && posts.length === 0 && (
        <div>There are no posts at this time...</div>
      )}

      {
        // if
        posts &&
          posts.length > 0 &&
          !isLoading &&
          !error &&
          // display all posts if there are any
          posts.map((post: Post) => <PostCard key={post.id} post={post} />)
      }
      {/* TEST POST: REMOVE THIS LATER */}
      {testPost.map((testPost: Post) => (
        <PostCard key={testPost.id} post={testPost} />
      ))}
    </div>
  );
}
