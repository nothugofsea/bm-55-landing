import styles from "./ContactsSection.module.scss";
import classNames from "classnames";
import {MapIFrame} from "./MapIFrame.tsx";
import {Contacts} from "./Contacts.tsx";

export const ContactsSection = function () {
    return (
        <div className={classNames(styles.contactsSection, "section")} id={"contacts-section"}>
            <div className={styles.container}>
                <Contacts/>
                <MapIFrame/>
            </div>
        </div>
    )
}