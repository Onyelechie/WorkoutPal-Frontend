
export type AlertDialogContextType = {
  showAlert: (title: string, message: string) => void;
};

export type ConfirmDialogContextType = {
  showConfirm: (title: string, message: string, positiveBtn: string, negativeBtn: string) => Promise<boolean>;
  showConfirmRisky: (title: string, message: string, positiveBtn: string, negativeBtn: string) => Promise<boolean>;
  showConfirmSafe: (title: string, message: string, positiveBtn: string, negativeBtn: string) => Promise<boolean>;
};