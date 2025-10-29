import "./AlertDialog.css";

type ConfirmDialogProps = {
    title: string;
    message: string
    handleConfirm: (result: boolean) => void;
    postiveBtn: string;
    negativeBtn: string;
};

/**
 * AlertDialog component
 * 
 * Receives dialog title, message and function as a prop to render.
 */
export function ConfirmDialog({ title, message, handleConfirm, postiveBtn, negativeBtn }: ConfirmDialogProps) {

    return (
        <div className="dialog-backdrop" >
            <div className="dialog-container" >
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="actions">
                    <button onClick={() => handleConfirm(true)}>{postiveBtn}</button>
                    <button onClick={() => handleConfirm(false)}>{negativeBtn}</button>
                </div>
            </div>
        </div>
    );

}
