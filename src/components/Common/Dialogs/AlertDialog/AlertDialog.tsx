import "../Dialog.css";
import "./AlertDialog.css";

type AlertDialogProps = {
  title: string;
  message: string;
  handleClose: () => void;
};

/**
 * AlertDialog component
 *
 * Receives dialog title, message and function as a prop to render.
 */
export function AlertDialog({ title, message, handleClose }: AlertDialogProps) {
  return (
    <div className="dialog-backdrop">
      <div className="dialog-container">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="alert-actions">
          <button className="positiveBtn" onClick={handleClose}>OK</button>
        </div>
      </div>
    </div>
  );
}
