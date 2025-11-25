import type { Post } from "../../types/api";
import "./PostCard.css";
import { notYetImplemented } from "../../utils/construction";

type PostProps = {
  post: Post;
};

export function PostCard({ post }: PostProps) {
  return (
    <div key={post.id} className="post-card" onClick={notYetImplemented}>
      <div className="post-header">
        <span>{post.postedBy}</span>
        <span>{new Date(post.date).toISOString().split("T")[0]}</span>
      </div>
      <div className="post-title">{post.title}</div>
      <div className="post-caption">{post.caption}</div>
      <div className="post-body">{post.body}</div>
      <div className="post-footer">
        <span className="post-likes post-clickable" onClick={notYetImplemented}>
          {post.likes} Likes
        </span>
        <span
          className="post-comments post-clickable"
          onClick={notYetImplemented}
        >
          {post.comments.length} Comment(s)
        </span>
      </div>
    </div>
  );
}
