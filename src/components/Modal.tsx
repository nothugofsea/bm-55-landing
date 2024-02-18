import {createPortal} from "react-dom";
import {FC, ReactNode} from 'react';

interface IModal {
    children: ReactNode;
    closeFunction?: () => void;
}

export const Modal: FC<IModal> = function ({children, closeFunction}) {
    return createPortal(
        <div
            className={"modal-container"}
            onClick={closeFunction}
        >
            {children}
        </div>,
        document.body
    )
}