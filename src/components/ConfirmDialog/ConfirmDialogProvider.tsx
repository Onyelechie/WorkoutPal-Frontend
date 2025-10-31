import { useState, type ReactNode } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { ConfirmDialogContext } from "./ConfirmDialogContext";

const initialBtnState = {
    text: "",
    color: ""
}

const inititalState = {
    isOpen: false,
    title: "",
    message: "",
    positiveBtn: "",
    negativeBtn: ""
};

type ButtonInfo = {
    text: string;
    color?: string;
};

type ConfirmDialogState = {
    isOpen: boolean;
    title: string;
    message: string;
    positiveBtn: string;
    negativeBtn: string;
};

const positiveColorRisky = "#c52525ff"
const positiveColorSafe = "#25c548ff"


export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
    const [dialog, setDialog] = useState<ConfirmDialogState>(inititalState);
    const [positiveBtnColor, setPostiveBtnColor] = useState<string>("");
    const [resolveConfirm, setResolveConfirm] = useState<(value: boolean) => void>(() => () => { });

    function showConfirm(title: string, message: string, positiveBtn: string, negativeBtn: string) {
        setDialog({ isOpen: true, title, message, positiveBtn, negativeBtn })
        return new Promise<boolean>((resolve) => {
            setResolveConfirm(() => resolve); // store resolver
        });
    }
    function showConfirmRisky(title: string, message: string, positiveBtn: string, negativeBtn: string) {
        setPostiveBtnColor(positiveColorRisky);
        return showConfirm(title, message, positiveBtn, negativeBtn);

    }
    function showConfirmSafe(title: string, message: string, positiveBtn: string, negativeBtn: string) {
        setPostiveBtnColor(positiveColorSafe);
        return showConfirm(title, message, positiveBtn, negativeBtn);

    }


    function handleClose() {
        setDialog(inititalState);
    }


    function handleConfirm(result?: boolean) {
        handleClose();

        if (typeof result === "boolean") {
            resolveConfirm(result);
        }
    }

    return (
        <ConfirmDialogContext.Provider value={{ showConfirm, showConfirmRisky, showConfirmSafe }}>
            {children} {/* Entire app. children is <App /> Component. Check "/src/main.tsx" */}

            {/* Dialog */}
            {dialog.isOpen && (
                <>
                    {/* very elegant */}
                    {/* pass the title, message and handleClose function via props (Properties)*/}
                    <ConfirmDialog
                        title={dialog.title}
                        message={dialog.message}
                        strPositiveButton={dialog.positiveBtn}
                        color={positiveBtnColor}
                        strNegativeButton={dialog.negativeBtn}
                        handleConfirm={handleConfirm}
                    />
                </>
            )}
        </ConfirmDialogContext.Provider>
    )
}