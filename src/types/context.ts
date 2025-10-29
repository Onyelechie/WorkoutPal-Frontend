
export type DialogContextType = {
  showAlert: (title: string, message: string) => void;
  showConfirm: (title: string, message: string, positiveBtn: string, negativeBtn: string) => Promise<boolean>;

};