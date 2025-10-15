import "./Dashboard.css";
import { notYetImplemented } from "../../utils/construction.ts";
import { usePosts } from "../../hooks/usePosts.ts";

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
      {isLoading && (<div>Loading...</div>)}
      {error && (<div>Could not get posts at this time. Please try again later.</div>)}
      {!isLoading && !error && posts.length === 0 && (<div>There are no posts at this time...</div>)}

      {posts && posts.length > 0 && !isLoading && !error && posts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={notYetImplemented}
            >
              <div className="post-header">
                <span>{post.postedBy}</span>
                <span>{post.date}</span>
              </div>
              <div className="post-title">{post.title}</div>
              <div className="post-caption">{post.caption}</div>
              <div className="post-footer">
                <span
                  className="post-likes post-clickable"
                  onClick={notYetImplemented}
                >
                  {post.likes} Likes
                </span>
                <span
                  className="post-comments post-clickable"
                  onClick={notYetImplemented}
                >
                  {post.comments.length} Comment(s)
                </span>
              </div>
            </div>))
      }


      
    </div>
  );
}
