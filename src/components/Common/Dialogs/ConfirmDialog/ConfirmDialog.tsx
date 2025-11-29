import "../Dialog.css";
import "./ConfirmDialog.css";

type ConfirmDialogProps = {
  title: string;
  message: string;
  strPositiveButton: string;
  color: string;
  strNegativeButton: string;
  handleConfirm: (result: boolean) => void;
};

/**
 * ConfirmDialog component
 */
export function ConfirmDialog({
  title,
  message,
  strPositiveButton,
  color,
  strNegativeButton,
  handleConfirm,
}: ConfirmDialogProps) {
  return (
    <div className="dialog-backdrop">
      <div className="dialog-container">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button 
            className="negativeBtn" 
            style={{ backgroundColor: "rgba(92, 92, 116, 1)"}}  
            onClick={() => handleConfirm(false)}
            >
            {strNegativeButton}
          </button>
          <button
            className="positiveBtn" 
            style={color ? { backgroundColor: color } : undefined}
            onClick={() => handleConfirm(true)}
            data-cy="confirm-positive-btn"
          >
            {strPositiveButton}
          </button>
        </div>
      </div>
    </div>
  );
}
