import {SlickArrowLeft, SlickArrowRight} from "../ApartmentsCarousel/ApartmentsCarousel.tsx";
import Slider from "react-slick";
import {useDetectDevice} from "../../hooks/useDetectDevice.ts";
import styles from "./Reviews.module.scss"
import {FC} from "react";
import "../../styles/Carousel.scss";
import starPath from "../../assets/star.svg";
import quotePath from "../../assets/quote.svg";

interface ReviewInfo {
    author: string;
    content: string;
    date: string;
    dateForTag: string;
    link: string;
}

const Review: FC<{info: ReviewInfo}> = function ({info}) {
    return (
        <blockquote className={styles.card}>
            <div className={styles.starsContainer}>
                {Array.from({length: 5}).map((_, index) =>
                    <img src={starPath} alt={"star"} className={styles.star} key={index}/>
                )}
            </div>
            <p>{info.content}</p>
            <div className={styles.authorContainer}>
                <a href={info.link}>
                    <cite>
                        {info.author}
                    </cite>
                </a>
                <div className={styles.separator}/>
                <time dateTime={info.dateForTag}>
                    {info.date}
                </time>
            </div>
        </blockquote>
    )
}

export const Reviews = function () {
    const device = useDetectDevice();
    const reviewsInfo = [
        {
            author: "Алексей",
            date: "Июль 2023",
            dateForTag: "2023-07",
            content: "Отель находится в самом центре города, рядом все основные исторические музеи и памятники. Если захотите вызвать такси, то проблем вообще не будет.\n" +
                "Это Апарт отель и питание в нем не предусмотрено, это очень удобно не надо доплачивать, можно заказать или принести еду с собой в номере все для этого есть\n" +
                "Отличные номера, в которых есть все для отдыха и для того чтобы готовить, печка микроволновка посудомоечная машина телевизор посуда чайник, есть абсолютно все и все очень чистое\n" +
                "белье идеальное чистая посуда, чистые полы и окна, чистая ванная комната, вообщем все на высоте\n" +
                "Работают два парня на ресепшн Дамир и Роман, особая благодарность им, все знают и во всем разбираются, ребята молодцы!",
            link: "https://ostrovok.ru/hotel/russia/st._petersburg/mid10607789/bm55_aparthotel/?q=2042&dates=26.07.2023-27.07.2023&guests=1&sid=fb2cf7d9-1599-4810-9da7-771810eb172f"
        },
        {
            author: "Андрей",
            date: "Июль 2023",
            dateForTag: "2023-07-09",
            content: "Очень позитивные впечатления от пребывания. Отель открыт недавно, качественный современный ремонт, красивый и приятный дизайн, очень чисто, хорошая шумоизоляция, современное оснащение со всей необходимой техникой (ТВ, стиральная и посудомоечная машины, капсулы к ним прилагаются), вся необходимая посуда в наличии, хороший кондиционер. Парковка платная, на территории внутреннего двора и в закрытом гараже. Расположение отличное, исторический центр, в пешей доступности все достопримечательности. Питание в отеле не предусмотрено, но рядом множество кафе и ресторанов, есть магазины со всем необходимым. Персонал очень вежливый и дружелюбный, готовы помочь.",
            link: "https://yandex.ru/maps/2/saint-petersburg/?ll=30.302540%2C59.931304&mode=poi&poi%5Bpoint%5D=30.302451%2C59.931542&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D128812848634&tab=reviews&z=18"
        },
        {
            author: "Наталья",
            date: "Июль 2023",
            dateForTag: "2023-07-13",
            content: "Прекрасный Апарт-отель. Остановились на неделю и ни разу не пожалели. Есть все для комфортного пребывания: удобный диван, кухня, большая ванная комната. Рекомендую.",
            link: "https://2gis.ru/spb/search/b%20m%2055/firm/70000001076234215/30.302443%2C59.931576/tab/reviews?m=30.300865%2C59.931398%2F14.73"
        }
    ]

    return (
        <div className={styles.carousel}>
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
                {reviewsInfo.map((info, index) => (
                    <div className={styles.cardContainer} key={index}>
                        <Review info={info}/>
                        <img src={quotePath} className={styles.quote} alt=""/>
                    </div>
                ))}
            </Slider>
        </div>

    )
}