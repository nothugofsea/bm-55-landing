import {ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode} from 'react';
import classes from "./Button.module.css";

interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode ;
    accentType: "primary" | "secondary-light" | "secondary-dark";
}

const Button: FC<IButton> = ({children, accentType, ...args}) => {
    function getButtonTypeClass(): string {
        switch (accentType) {
            case "primary":
                return classes.primary;
            case "secondary-light":
                return classes.secondaryLight;
            case "secondary-dark":
                return classes.secondaryDark;
        }
    }

    const {className, ...additionalArgs} = args;

    return (
        <button className={
            [classes.button, getButtonTypeClass(), className].join(" ")
        } {...additionalArgs}>
            {children}
        </button>
    );
};

export default Button;