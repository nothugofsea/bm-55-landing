import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

const getUrl = (dateFrom: number, dateTo: number, adultGuestCount: number, children: number[], appsID?: number) => {
    return `https://reservationsteps.ru/rooms/index/247567ed-1437-4ae7-a76b-efeab61542a5` +
        `?lang=ru` +
        `&dfrom=${formatDate(dateFrom)}` +
        `&dto=${formatDate(dateTo)}` +
        `&scroll_to_rooms=1` +
        `&children=${children.length ? '%5B' + children.join("%2C") + '%5D' : ''}` +
        `&adults=${adultGuestCount}` +
        (appsID ? `&onlyrooms=${appsID}` : "") +
        `&insidePopup=1`;
}

interface IBookingState {
    showIFrame: boolean;
    iFrameURL: string;
    dateFrom: number;
    dateTo: number;
    adultGuestCount: number;
    childrenAgeList: number[];
}

const initialState: IBookingState = {
    showIFrame: false,
    iFrameURL: "",
    dateFrom: Date.now(),
    dateTo: Date.now() + 1000 * 60 * 60 * 24,
    adultGuestCount: 1,
    childrenAgeList: []
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        changeDateFrom(state, action: PayloadAction<number | null>) {
            if (action.payload) {
                state.dateFrom = action.payload;

                const payloadNextDay = action.payload + 1000 * 60 * 60 * 24;

                if (state.dateTo && payloadNextDay > state.dateTo) {
                    state.dateTo = payloadNextDay;
                }
            }
        },
        changeDateTo(state, action: PayloadAction<number | null>) {
            if (action.payload) {
                state.dateTo = action.payload;
            }
        },
        setAdultGuestCount(state, action: PayloadAction<number>) {
            if (0 <= action.payload && action.payload <= 20) {
                state.adultGuestCount = action.payload;
            }
        },
        decreaseAdultCount(state) {
            if (state.adultGuestCount > 1) {
                state.adultGuestCount -= 1;
            }
        },
        increaseAdultCount(state) {
            if (state.adultGuestCount < 20) {
                state.adultGuestCount += 1;
            }
        },
        addChild(state, action: PayloadAction<number>) {
            state.childrenAgeList.push(action.payload);
        },
        removeChild(state, action: PayloadAction<number>) {
            state.childrenAgeList.splice(action.payload, 1);
        },
        setShowIFrame(state, action: PayloadAction<boolean>) {
            state.showIFrame = action.payload;
        },
        openDateBooking(state) {
            state.iFrameURL = getUrl(state.dateFrom, state.dateTo, state.adultGuestCount, state.childrenAgeList);
            state.showIFrame = true;
        },
        openDefaultDateBooking(state) {
            state.iFrameURL = getUrl(initialState.dateFrom, initialState.dateTo, initialState.adultGuestCount, initialState.childrenAgeList);
            state.showIFrame = true;
        },
        openDefaultDateBookingWithApps(state, action: PayloadAction<number>) {
            state.iFrameURL = getUrl(initialState.dateFrom, initialState.dateTo, initialState.adultGuestCount, initialState.childrenAgeList, action.payload);
            state.showIFrame = true;
        },
        closeIFrame(state) {
            state.showIFrame = false;
        }
    }
});

export const {
    changeDateFrom,
    changeDateTo,
    setAdultGuestCount,
    increaseAdultCount,
    decreaseAdultCount,
    addChild,
    removeChild,
    openDateBooking,
    openDefaultDateBooking,
    openDefaultDateBookingWithApps,
    closeIFrame
} = bookingSlice.actions;
export default bookingSlice.reducer;