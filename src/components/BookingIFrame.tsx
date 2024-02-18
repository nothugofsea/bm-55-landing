import Iframe from "react-iframe";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {closeIFrame} from "../redux/features/bookingSlice.ts";
import {Modal} from "./Modal.tsx";

const BookingIFrame = () => {
    const {iFrameURL, showIFrame} = useAppSelector(state => state.booking);
    const dispatch = useAppDispatch();

    return (
        showIFrame && <Modal
            closeFunction={() => dispatch(closeIFrame())}
        >
            <Iframe
                className={"booking-iframe"}
                url={iFrameURL}
            />
        </Modal>
    );
};

export default BookingIFrame;