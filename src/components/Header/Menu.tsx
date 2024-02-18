import classes from "./Header.module.css";
import {FC, ReactElement, ReactNode} from "react";

interface IMenuItem {
    children: ReactNode;
}

interface IMenu {
    children: ReactElement<IMenuItem> | ReactElement<IMenuItem>[];
}

const Menu: FC<IMenu> & {Item: FC<IMenuItem>} = ({children}) => {
    return (
        <ul className={classes.menu}>
            {children}
        </ul>
    );
};

Menu.Item = function MenuItem({children}) {
    return (
        <li className={classes.menuItem}>
            {children}
        </li>
    )
}

export default Menu;