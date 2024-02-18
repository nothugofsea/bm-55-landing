import classes from "./ContactsSection.module.scss";
import classNames from "classnames";
import Button from "../UI/Button/Button.tsx";

export const Contacts = function () {
    const contacts = [
        {
            fieldHeading: "Номер телефона (круглосуточно)",
            body: "+7 (981) 052-27-52 (Роман)",
            href: "tel:+79810522752"
        },
        {
            fieldHeading: "Электронная почта",
            body: "b.morskaya.55@mail.ru",
            href: "mailto:b.morskaya.55@mail.ru"
        },
        {
            fieldHeading: "Адрес",
            body: "Почтамтский пер., 7",
            href: "https://yandex.com/maps/-/CLRSrgq"
        }
    ]

    return (
        <div className={classes.contacts}>
            <div>
                <h1
                    className={classNames("heading", classes.header)}
                >
                    Контакты
                </h1>
                <div className={classes.verticalSeparator} />
            </div>
            <div className={classes.contactFields}>
                {contacts.map((contact) => (
                    <div className={classes.field} key={contact.fieldHeading}>
                        <span className={classes.fieldHeading}>
                            {contact.fieldHeading}
                        </span>
                        <a className={classes.fieldBody} href={contact.href}>
                            {contact.body}
                        </a>
                    </div>
                ))}
            </div>
            <a
                href={"https://google.com/"}
                className={classes.buildRoadLink}
                target={"_blank"}
            >
                <Button
                    accentType={"primary"}
                    className={classes.buildRoadBtn}
                >
                    Построить маршрут
                </Button>
            </a>
        </div>
    )
}