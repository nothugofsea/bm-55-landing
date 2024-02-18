import Iframe from "react-iframe";
import classes from "./ContactsSection.module.css";

export const MapIFrame = function () {
    return (
        <Iframe
            className={classes.map}
            url={"https://yandex.ru/map-widget/v1/?um=constructor%3A19cf353fd7ba68db21ae94047f0212b34ff6f9d7b94ff768c6de1ab0ef4e0ce6&amp;source=constructor"}
        />
    )
}