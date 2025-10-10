import './dashboard.css';
import { notYetImplemented } from "../../utils/construction.ts";
import { usePosts } from "../../hooks/usePosts.ts";

export default function Dashboard() {

    const { posts, isLoading, fetchPosts } = usePosts();

    return (
    <>
        <div className="dashboard-container">
            <h1 className="dashboard-header">Dashboard</h1>

            <div className="dashboard-action-buttons grouped-buttons">
                <button onClick={fetchPosts} disabled={isLoading}>Refresh</button>
                <button onClick={notYetImplemented}>Create Post</button>
            </div>

            {/* Show appropriate message if posts.length == 0, otherwise, show the post cards */}
            {posts.length === 0 ? "There are currently no posts..." : posts.map((post) => (
                <div key={post.id} className="post-card" onClick={notYetImplemented}>
                    <div className="post-header">
                        <span>{post.postedBy}</span>
                        <span>{post.date}</span>
                    </div>
                    <div className="post-title">{post.title}</div>
                    <div className="post-caption">{post.caption}</div>
                    <div className="post-footer">
                        <span className="post-likes post-clickable" onClick={notYetImplemented}>{post.likes} Likes</span>
                        <span className="post-comments post-clickable" onClick={notYetImplemented}>{post.comments.length} Comment(s)</span>
                    </div>
                </div>

            ))}
        </div>
    </>
    );
};