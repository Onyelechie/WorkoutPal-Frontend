import "./Dashboard.css";
import { useState } from "react";
import { usePosts } from "../../hooks/usePosts.ts";
import { PostCard } from "../PostCard/PostCard.tsx";
import { CreatePost } from "../CreatePost/CreatePost.tsx";
import type { Post } from "../../types/api.ts";



export default function Dashboard() {
  const { posts, isLoading, error, fetchPosts } = usePosts();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>

      <div className="dashboard-action-buttons grouped-buttons">
        <button onClick={fetchPosts} disabled={isLoading}>
          Refresh
        </button>
        <button onClick={() => setShowCreatePost(true)}>Create Post</button>
      </div>

      {showCreatePost && (
        <CreatePost
          onPostCreated={() => {
            setShowCreatePost(false);
            fetchPosts();
          }}
          onCancel={() => setShowCreatePost(false)}
        />
      )}

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
          sortedPosts.map((post: Post) => <PostCard key={post.id} post={post} onUpdate={fetchPosts} />)
      }
    </div>
  );
}
