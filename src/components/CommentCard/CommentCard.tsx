import "./CommentCard.css";
import type { Comment } from "../../types/api";
import { notYetImplemented } from "../../utils/construction";

type CommentProps = {
  comment: Comment;
};

export function CommentCard({ comment }: CommentProps) {
  return (
    <div className="comment-card" onClick={notYetImplemented}>
      <div className="comment-header">
        <h3>
          {comment.commentedBy} commented on {comment.commentedOn}
        </h3>
      </div>
      <p>{comment.comment}</p>
      <p>{comment.date}</p>
    </div>
  );
}
