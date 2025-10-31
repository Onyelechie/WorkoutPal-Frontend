

type ConfirmDialogProps = {
    title: string;
    message: string
    strPositiveButton: string;
    color: string,
    strNegativeButton: string;
    handleConfirm: (result: boolean) => void;
};

/**
 * AlertDialog component
 * 
 * Receives dialog title, message and function as a prop to render.
 */
export function ConfirmDialog({ title, message, strPositiveButton, color, strNegativeButton, handleConfirm, }: ConfirmDialogProps) {

    return (
        <div className="dialog-backdrop" >
            <div className="dialog-container" >
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="actions">
                    <button onClick={() => handleConfirm(false)}>{strNegativeButton}</button>
                    <button style={color ? { backgroundColor: color } : undefined} onClick={() => handleConfirm(true)}>{strPositiveButton}</button>
                </div>
            </div>
        </div >
    );

}