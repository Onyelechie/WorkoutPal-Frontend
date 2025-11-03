
export type AlertDialogContextType = {
  showAlert: (title: string, message: string) => void;
};

export type ConfirmDialogContextType = {
  // ConfirmDialogContext.showConfirm() -> display a confirm dialog (2 buttons)
  showConfirm: (title: string, message: string, positiveBtn: string, negativeBtn: string) => Promise<boolean>;

  // ConfirmDialogContext.showConfirmRisky() -> display a confirm dialog (2 buttons)
  // Risky means the action is a destructive action e.g: Deleting an item.
  // The positive button is colored 'RED'
  showConfirmRisky: (title: string, message: string, positiveBtn: string, negativeBtn: string) => Promise<boolean>;

  // ConfirmDialogContext.showConfirmSafe() -> display a confirm dialog (2 buttons)
  // Safe means the action is a safe action e.g: Saving a file.
  // The positive button is colored 'GREEN'
  showConfirmSafe: (title: string, message: string, positiveBtn: string, negativeBtn: string) => Promise<boolean>;
};