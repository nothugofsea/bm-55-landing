import {FC, ReactNode} from "react";
import classes from "./GuestPicker.module.scss";

interface IContainer {
    children: ReactNode;
}

const Container: FC<IContainer> = ({children}) => {
    return (
        <>
            <div className={classes.sectionsContainer}>
                {children}
            </div>
            <div className={classes.separator}/>
        </>
    )
}

export default Container;