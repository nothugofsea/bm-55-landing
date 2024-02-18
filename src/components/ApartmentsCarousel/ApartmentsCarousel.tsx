import classes from "./ApartmentsCarousel.module.css";
import Slider, {CustomArrowProps} from "react-slick";
import "../../styles/Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import {baseCard, familyCard, ICard, premiumCard} from "./AppsData.ts";
import {FC} from "react";
import React from "react";
import Button from "../UI/Button/Button.tsx";
import {useAppDispatch} from "../../hooks/redux.ts";
import {openDefaultDateBookingWithApps} from "../../redux/features/bookingSlice.ts";
import classNames from "classnames";
import {useDetectDevice} from "../../hooks/useDetectDevice.ts";

interface IApartmentsCard {
    cardInfo: ICard;
}

export const Photo = ({ path }: {path: string}) => {

    return <img src={"./images" + path} alt={path} />;
};

const ApartmentsCard: FC<IApartmentsCard> = ({cardInfo}) => {
    const carouselSettings = {
        infiniteLoop: true,
        showIndicators: false,
        showThumbs: false,
        showStatus: false,
        showArrows: true,
        autoPlay: true,
        interval: 10000
    }
    const dispatch = useAppDispatch();

    return (
        <div className={classes.card}>
            <Carousel
              className="custom-carousel"
                {...carouselSettings}
            >
                {cardInfo.imagePaths.map((imagePath) => (
                    <div key={Math.random()}>
                        <Photo path={imagePath} />
                    </div>
                ))}
            </Carousel>
            <div className={classes.cardInfo}>
                <h1 className={classes.cardHeading}>
                    {cardInfo.name}
                </h1>
                <div className={classes.features}>
                    {cardInfo.features.map((feature, index) => (
                        <React.Fragment key={Math.random()}>
                            <span>{feature}</span>
                            {index !== cardInfo.features.length - 1 && <div className={classes.verticalSeparator}/>}
                        </React.Fragment>
                    ))}
                </div>
                <span
                    className={classes.additionalInfoBtn}
                >
                    Узнать подробнее
                </span>
                <div className={classes.horizontalSeparator}/>
                <div className={classes.bookingSection}>
                    <div className={classes.priceBlock}>
                        <span className={classes.hint}>Начинается от</span>
                        <span className={classes.price}>{cardInfo.startPrice} РУБ/НОЧЬ</span>
                    </div>
                    <Button
                        accentType={"primary"}
                        onClick={() => dispatch(openDefaultDateBookingWithApps(cardInfo.id))}
                    >
                        Подобрать
                    </Button>
                </div>
            </div>
        </div>
    )
}

export const SlickArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => {
    return (
        <button
            {...props}
            className={"slick-next slick-arrow"}
            aria-hidden="true"
            type="button"
        >
            <div className={classes.arrowContainer}>
                <div className={classes.arrowLine}/>
                <div className={classes.arrowHead}/>
            </div>
        </button>
    )
}

export const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => {
    return (
        <button
            {...props}
            className={"slick-prev slick-arrow"}
            aria-hidden="true"
            type="button"
        >
            <div className={classNames(classes.arrowContainer, classes.leftArrow)}>
                <div className={classes.arrowLine}/>
                <div className={classes.arrowHead}/>
            </div>
        </button>
    )
}

const ApartmentsCarousel = () => {
    const device = useDetectDevice();

    return (
        <div className={classes.carousel}>
            <Slider
                slidesToShow={device === "mobile" || device === "tablet-v" ? 1 : 2}
                infinite={false}
                slidesToScroll={1}
                swipe={true}
                variableWidth={false}
                nextArrow={
                    <SlickArrowRight/>
                }
                prevArrow={
                    <SlickArrowLeft/>
                }
            >
                <ApartmentsCard cardInfo={baseCard}/>
                <ApartmentsCard cardInfo={familyCard}/>
                <ApartmentsCard cardInfo={premiumCard}/>
            </Slider>
        </div>
    );
};

export default ApartmentsCarousel;