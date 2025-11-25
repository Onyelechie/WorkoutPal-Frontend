import { useState } from "react";
import type { Post } from "../../types/api";
import { usePosts } from "../../hooks/usePosts";
import { useMe } from "../../hooks/useMe";
import "./CommentsModal.css";

interface CommentsModalProps {
  post: Post;
  onClose: () => void;
}

export function CommentsModal({ post, onClose }: CommentsModalProps) {
  const { addComment } = usePosts();
  const { user } = useMe();
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      await addComment(post.id, user.id, newComment.trim());
      setNewComment("");
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="comments-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comments-header">
          <h3>Comments</h3>
          <button onClick={onClose}>×</button>
        </div>
        
        <div className="comments-list">
          {post.comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.commentedBy}</span>
                  <span className="comment-date">{new Date(comment.date).toLocaleDateString()}</span>
                </div>
                <p className="comment-text">{comment.comment}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit" disabled={!user}>Post</button>
        </form>
      </div>
    </div>
  );
}