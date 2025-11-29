import "./CommentCard.css";
import type { Comment } from "../../types/api";

type CommentProps = {
  comment: Comment;
};

export function CommentCard({ comment }: CommentProps) {
  return (
    <div className="comment-card">
      <div className="comment-header">
        <h3>{comment.username}</h3>
        <span>{new Date(comment.date).toLocaleDateString()}</span>
      </div>
      <p>{comment.comment}</p>
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply, idx) => (
            <div key={idx} className="reply">
              <p>{reply.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
