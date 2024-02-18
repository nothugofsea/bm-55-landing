import {FC} from 'react';
import classes from "./GuestPicker.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {decreaseAdultCount, increaseAdultCount, setAdultGuestCount} from "../../redux/features/bookingSlice.ts";

interface ICounterButton {
    type: "increase" | "decrease";
    onClick: () => void;
}

const CounterButton: FC<ICounterButton> = ({type, onClick}) => {
    const matchSignClass = () => {
        switch (type) {
            case "increase":
                return classes.plusSign;
            case "decrease":
                return classes.minusSign;
        }
    }

    const signClass = matchSignClass();

    return (
        <button
            className={classes.counterButton}
            onClick={onClick}
        >
            <span className={signClass}/>
        </button>
    )
}

const AdultCounter = () => {
    const adultGuestCount = useAppSelector(state => state.booking.adultGuestCount);
    const dispatch = useAppDispatch();

    return (
        <div className={classes.adultCounter}>
            <CounterButton
                type={"decrease"}
                onClick={() => dispatch(decreaseAdultCount())}
            />
            <input
                className={classes.adultCount}
                value={adultGuestCount}
                onChange={(e) => {
                    dispatch(setAdultGuestCount(Number(e.target.value)))
                }}
                onBlur={() => {
                    if (!adultGuestCount) {
                        dispatch(setAdultGuestCount(1));
                    }
                }}
            />
            <CounterButton
                type={"increase"}
                onClick={() => dispatch(increaseAdultCount())}
            />
        </div>
    )
}

const AdultSection = () => {
    return (
        <div className={classes.adultSection}>
            <div className={classes.headingsContainer}>
                <span className={classes.heading}>Взрослых</span>
                <span className={classes.subheading}>от 18 лет</span>
            </div>
            <AdultCounter/>
        </div>
    );
};

export default AdultSection;