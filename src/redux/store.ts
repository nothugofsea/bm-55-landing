import {combineReducers, configureStore} from "@reduxjs/toolkit";
import bookingReducer from "./features/bookingSlice.ts";

const rootReducer = combineReducers({
    booking: bookingReducer
})



export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: false
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']