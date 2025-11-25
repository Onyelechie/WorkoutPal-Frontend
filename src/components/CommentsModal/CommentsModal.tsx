import { useState, useEffect } from "react";
import type { Post } from "../../types/api";
import { usePosts } from "../../hooks/usePosts";
import { useMe } from "../../hooks/useMe";
import "./CommentsModal.css";

interface CommentsModalProps {
  post: Post;
  onClose: () => void;
  onCommentAdded?: () => void;
}

export function CommentsModal({ post, onClose, onCommentAdded }: CommentsModalProps) {
  const { addComment, replyToComment, posts } = usePosts();
  const [currentPost, setCurrentPost] = useState(post);
  const { user } = useMe();
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const updatedPost = posts.find(p => p.id === post.id);
    if (updatedPost) setCurrentPost(updatedPost);
  }, [posts, post.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      await addComment(post.id, user.id, newComment.trim());
      setNewComment("");
      onCommentAdded?.();
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleReply = async (commentId: number) => {
    if (!user || !replyText.trim()) return;

    try {
      await replyToComment(post.id, commentId, user.id, replyText.trim());
      setReplyText("");
      setReplyingTo(null);
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
          {currentPost.comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            currentPost.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.username}</span>
                  <span className="comment-date">{new Date(comment.date).toLocaleDateString()}</span>
                </div>
                <p className="comment-text">{comment.comment}</p>
                {comment.replies && comment.replies.length > 0 && (
                  <div className="replies">
                    {comment.replies.map((reply, idx) => (
                      <div key={idx} className="reply">
                        <p className="reply-text">{reply}</p>
                      </div>
                    ))}
                  </div>
                )}
                <button 
                  className="reply-button" 
                  onClick={() => setReplyingTo(comment.id)}
                >
                  Reply
                </button>
                {replyingTo === comment.id && (
                  <div className="reply-form">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                    />
                    <button onClick={() => handleReply(comment.id)}>Post</button>
                    <button onClick={() => { setReplyingTo(null); setReplyText(""); }}>Cancel</button>
                  </div>
                )}
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