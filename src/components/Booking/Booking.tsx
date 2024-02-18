import Button from "../UI/Button/Button.tsx";
import React, {FC, ReactElement} from "react";
import classes from "./Booking.module.css";
import {useAppDispatch} from "../../hooks/redux.ts";
import {openDateBooking} from "../../redux/features/bookingSlice.ts";
import {useDetectDevice} from "../../hooks/useDetectDevice.ts";

interface IBookingOption {
    headingText: string;
    children: ReactElement;
}

interface IBooking {
    children: ReactElement<IBookingOption>[];
}

type BookingOptionComponent = FC<IBookingOption>;

const BookingOption: BookingOptionComponent = ({headingText, children}) => {
    return (
        <div className={classes.bookingOption}>
            <span className={classes.bookingOptionHeading}>
                {headingText}
            </span>
            <div>
                {children}
            </div>
        </div>
    )
};

const Booking: FC<IBooking> & {Option: BookingOptionComponent} = ({children}) => {
    const dispatch = useAppDispatch();
    const device = useDetectDevice();

    return (
        <div className={classes.bookingSection}>
            <div className={classes.options}>
                {children.map((child, index) => (
                    <React.Fragment key={Math.random()}>
                        {child}
                        {
                            index !== children.length - 1 &&
                            (device !== "mobile" ?
                                <div className={classes.separator}/> :
                                <div className={classes.verticalSep}></div>)
                        }
                    </React.Fragment>
                ))}
            </div>
            <Button
                accentType={"primary"}
                onClick={() => dispatch(openDateBooking())}
                className={classes.bookButton}
            >
                Показать наличие
            </Button>
        </div>
    );
};

Booking.Option = BookingOption;

export default Booking;