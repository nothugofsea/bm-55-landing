import Button from "../UI/Button/Button.tsx";
import classes from "./Header.module.css";
import Menu from "./Menu.tsx";
import {useAppDispatch} from "../../hooks/redux.ts";
import {openDefaultDateBooking} from "../../redux/features/bookingSlice.ts";
import useIsAtTop from "../../hooks/useIsAtTop.ts";
import logoPath from "../../assets/logo.svg";
import {useDetectDevice} from "../../hooks/useDetectDevice.ts";
import {MobileMenu} from "./MobileMenu.tsx";
import {FC} from "react";

interface IItem {
  name: string;
  href: string;
}

const LinkItem: FC<{ item: IItem }> = ({item}) => {
  return (
    <a
      className={classes.linkItem}
      href={item.href}
    >
      {item.name}
    </a>
  )
}

const Header = () => {
  const dispatch = useAppDispatch();
  const isAtTop = useIsAtTop();
  const device = useDetectDevice();
  const items = [
    {name: "Удобства", href: "#services-section"},
    {name: "Апартаменты", href: "#apartments-section"},
    {name: "Контакты", href: "#contacts-section"}
  ]

  return (
    <header className={[classes.header, !isAtTop ? classes.notAtTop : ""].join(" ")}>
      <div className={classes.container}>
        <div className={classes.activePart}>
          <img src={logoPath} className={classes.logo}/>
          {device !== "mobile" && <Menu>
            {items.map((item, index) => (
              <Menu.Item key={index}>
                <LinkItem item={item}/>
              </Menu.Item>
            ))}
          </Menu>}
        </div>
        {device !== "mobile" && <Button
            accentType={isAtTop && device === "desktop" ? "secondary-light" : "secondary-dark"}
            onClick={() => dispatch(openDefaultDateBooking())}
        >
            Забронировать
        </Button>}
        {device === "mobile" &&
            <MobileMenu>
              {items.map((item, index) => (
                <MobileMenu.Item key={index}>
                  <LinkItem item={item}/>
                </MobileMenu.Item>
              ))}
            </MobileMenu>
        }
      </div>
    </header>
  );
};

export default Header;