import classes from "./GuestPicker.module.scss";
import React, {FC, useRef, useState} from "react";
import {useOnClickOutside} from "../../hooks/useOnClickOutside.ts";
import AdultSection from "./AdultSection.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {setAdultGuestCount} from "../../redux/features/bookingSlice.ts";
import Container from "./Container.tsx";
import ChildrenSections from "./ChildrenSections.tsx";
import {Modal} from "../Modal.tsx";
import classNames from "classnames";
import {useDetectDevice} from "../../hooks/useDetectDevice.ts";

interface IPickerModal {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PickerModal: FC<IPickerModal> = ({setIsOpen}) => {
    const ref = useRef(null);
    const {adultGuestCount} = useAppSelector(state => state.booking);
    const dispatch = useAppDispatch();

    useOnClickOutside(ref, (event: MouseEvent) => {
        const target = event.target as Element;
        if (!target.classList.contains("ignore-onclickoutside")) {
            setIsOpen(false);
        }

        if (!adultGuestCount) {
            dispatch(setAdultGuestCount(1));
        }
    });
    const device = useDetectDevice();

    const component =
        <div
            ref={ref}
            className={classNames(classes.guestPickerModal, {[classes.inBooking]: device === "desktop"})}
        >
            <Container>
                <AdultSection/>
            </Container>
            <ChildrenSections/>
        </div>

    return (
        device !== "desktop" ?
            <Modal>
                {component}
            </Modal> :
            component
    )
}

const GuestPicker = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {adultGuestCount, childrenAgeList} = useAppSelector(state => state.booking);
    const totalGuests = adultGuestCount + childrenAgeList.length;

    const getGuests = () => {
        if (totalGuests === 1) {
            return `${totalGuests} гость`
        }

        if (2 <= totalGuests && totalGuests <= 4) {
            return `${totalGuests} гостя`
        }

        if (5 <= totalGuests && totalGuests <= 20) {
            return `${totalGuests} гостей`
        }

        return "0 гостей";
    }

    return (
        <>
            <span
                className={[classes.totalGuestCount, isOpen ? "ignore-onclickoutside" : ""].join(" ")}
                onClick={() => setIsOpen(true)}
            >
                {getGuests()}
            </span>
            {isOpen &&
                <div className={classes.modalContainer}>
                    <PickerModal setIsOpen={setIsOpen}/>
                </div>
            }
        </>
    );
};

export default GuestPicker;