import { useState } from "react";
import type { Post } from "../../types/api";
import "./PostCard.css";
import { usePosts } from "../../hooks/usePosts";
import { useMe } from "../../hooks/useMe";
import { CommentsModal } from "../CommentsModal/CommentsModal";

type PostProps = {
  post: Post;
};

export function PostCard({ post }: PostProps) {
  const { likePost, unlikePost } = usePosts();
  const { user } = useMe();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    
    try {
      if (isLiked) {
        await unlikePost(post.id, user.id);
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        await likePost(post.id, user.id);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div key={post.id} className="post-card">
      <div className="post-header">
        <span>{post.postedBy}</span>
        <span>{new Date(post.date).toISOString().split("T")[0]}</span>
      </div>
      <div className="post-title">{post.title}</div>
      <div className="post-caption">{post.caption}</div>
      <div className="post-body">{post.body}</div>
      <div className="post-footer">
        <span className="post-likes post-clickable" onClick={handleLikeClick}>
          <span className={`heart ${isLiked ? 'liked' : ''}`}>♥</span>
          {likeCount} Likes
        </span>
        <span
          className="post-comments post-clickable"
          onClick={(e) => {
            e.stopPropagation();
            setShowComments(true);
          }}
        >
          <span className="comment-icon">💬</span>
          {post.comments.length} Comment(s)
        </span>
      </div>
      {showComments && (
        <CommentsModal
          post={post}
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  );
}
