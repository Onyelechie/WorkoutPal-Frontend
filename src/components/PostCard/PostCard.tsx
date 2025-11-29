import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../types/api";
import "./PostCard.css";
import { usePosts } from "../../hooks/usePosts";
import { useMe } from "../../hooks/useMe";
import { CommentsModal } from "../CommentsModal/CommentsModal";
import { userService } from "../../services/userService";

type PostProps = {
  post: Post;
  onUpdate?: () => void;
};

export function PostCard({ post }: PostProps) {
  const { likePost, unlikePost } = usePosts();
  const { user } = useMe();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentCount, setCommentCount] = useState(post.comments.length);
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

  const handleUsernameClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;

    // If it's the current user's post, go to profile page
    if (post.postedBy === user.username) {
      navigate('/profile');
      return;
    }

    // Navigate immediately - let the profile page handle loading
    // First try to get user ID from cache (fast)
    const userId = await userService.getUserIdByUsername(post.postedBy);
    if (userId) {
      navigate(`/users/${userId}`);
    } else {
      // If not found in cache, navigate with username as fallback
      // The profile page will handle the lookup and loading state
      navigate(`/users/username/${post.postedBy}`);
    }
  };

  return (
    <div key={post.id} className="post-card">
      <div className="post-header">
        <span 
          className="post-username clickable"
          onClick={handleUsernameClick}
        >
          {post.postedBy}
        </span>
        <span>{new Date(post.date).toISOString().split("T")[0]}</span>
      </div>
      <div className="post-title">{post.title}</div>
      <div className="post-caption">{post.caption}</div>
      <div className="post-body" style={{ whiteSpace: 'pre-wrap' }}>{post.body}</div>  {/* the whiteSpace style doesnt work in css file */}
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
          {commentCount} Comment(s)
        </span>
      </div>
      {showComments && (
        <CommentsModal
          post={post}
          onClose={() => setShowComments(false)}
          onCommentAdded={() => setCommentCount(prev => prev + 1)}
        />
      )}
    </div>
  );
}
