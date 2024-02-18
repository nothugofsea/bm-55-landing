import React, {forwardRef, useCallback, useMemo} from 'react';
import Booking from "./Booking/Booking.tsx";
import ReactDatePicker from "react-datepicker";
import {changeDateFrom, changeDateTo} from "../redux/features/bookingSlice.ts";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {ru} from "date-fns/locale";
import GuestPicker from "./GuestPicker/GuestPicker.tsx";
import {useDetectDevice} from "../hooks/useDetectDevice.ts";

const BookingSection = () => {
    const dateFrom = useAppSelector(state => state.booking.dateFrom);
    const dateTo = useAppSelector(state => state.booking.dateTo);
    const dispatch = useAppDispatch();

    const minDateTo = useMemo(() => {
        const tomorrowTimestamp = Date.now() + 1000 * 60 * 60 * 24;

        if (dateFrom === null) {
            return new Date(tomorrowTimestamp);
        }

        return new Date(Math.max(tomorrowTimestamp, dateFrom + 1000 * 60 * 60 * 24));
    }, [dateFrom]);

    const getSelectedDate = useCallback((date: number | null) => {
        return date === null ? null : new Date(date);
    }, [])
    const onChangeDate = (cb: ActionCreatorWithPayload<number | null>) => {
        return (e: Date | null) => e !== null ? dispatch(cb(+e)) : dispatch(cb(null));
    }

    const DateView = forwardRef<
        HTMLInputElement,
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
    >((props, ref) => {
        const {value, ...additionalProps} = props;

        return (
            <span {...additionalProps} ref={ref}>{value}</span>
        )
    });

    const device = useDetectDevice();

    const datePickerSettings = {
        showPopperArrow: false,
        dateFormat: "dd/MM/Y",
        customInput: <DateView/>,
        withPortal: device !== "desktop",
        portalId: "root",
        locale: ru
    }

    return (
        <Booking>
            <Booking.Option
                headingText="Дата Заезда"
            >
                <ReactDatePicker
                    selected={getSelectedDate(dateFrom)}
                    onChange= {onChangeDate(changeDateFrom)}
                    minDate={new Date()}
                    {...datePickerSettings}
                />
            </Booking.Option>
            <Booking.Option
                headingText="Дата Выезда"
            >
                <ReactDatePicker
                    selected={getSelectedDate(dateTo)}
                    onChange={onChangeDate(changeDateTo)}
                    minDate={minDateTo}
                    {...datePickerSettings}
                />
            </Booking.Option>
            <Booking.Option
                headingText="Количество гостей"
            >
                <GuestPicker/>
            </Booking.Option>
        </Booking>
    );
};

export default BookingSection;