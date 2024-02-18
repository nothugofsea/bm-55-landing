import classes from "./Header.module.scss";
import {createPortal} from "react-dom";
import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState} from "react";
import {openDefaultDateBooking} from "../../redux/features/bookingSlice.ts";
import Button from "../UI/Button/Button.tsx";
import {useAppDispatch} from "../../hooks/redux.ts";

interface IMenuModal {
    children: ReactNode;
}

const MobileMenuContext = createContext<Dispatch<SetStateAction<boolean>> | null>(null);

const MenuModal: FC<IMenuModal> = ({children}) => {
    const dispatch = useAppDispatch();

    return createPortal(
        <div className={classes.menuModal}>
            <ul className={classes.menuModalItems}>
                {children}
            </ul>
            <Button
                className={classes.bookButton}
                accentType={"secondary-dark"}
                onClick={() => dispatch(openDefaultDateBooking())}
            >
                Забронировать
            </Button>
        </div>
    , document.body)
}

interface IMobileMenu {
    children: ReactNode;
}

interface IMobileMenuItem {
    children: ReactNode;
}

const MobileMenu: FC<IMobileMenu> & {Item: FC<IMobileMenuItem>} = function ({children}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <MobileMenuContext.Provider value={setIsOpen}>
            {isOpen ?
                <>
                    <div
                        className={classes.cross}
                        onClick={() => setIsOpen(false)}
                    >
                        <div className={classes.line}/>
                        <div className={classes.line}/>
                    </div>
                    <MenuModal>
                        {children}
                    </MenuModal>
                </>
                :
                <div
                    className={classes.menuGamburger}
                    onClick={() => setIsOpen(true)}
                >
                    <div className={classes.line}/>
                    <div className={classes.line}/>
                    <div className={classes.line}/>
                </div>}
        </MobileMenuContext.Provider>

    )
}

MobileMenu.Item = function MobileMenuItem({children})  {
    const setIsOpen = useContext(MobileMenuContext);

    return (
        <li
            className={classes.menuModalItem}
            onClick={() => setIsOpen && setIsOpen(false)}
        >
            {children}
        </li>
    )
}

export {MobileMenu};