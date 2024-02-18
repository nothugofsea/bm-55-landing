import "react-datepicker/src/stylesheets/datepicker.scss"
import "./styles/App.css";
import Header from "./components/Header/Header.tsx";
import BookingSection from "./components/BookingSection.tsx";
import BookingIFrame from "./components/BookingIFrame.tsx";
import ApartmentsCarousel, {Photo} from "./components/ApartmentsCarousel/ApartmentsCarousel.tsx";
import TextSection from "./components/TextSection.tsx";
import {services, location} from "./textSections.tsx";
import {ContactsSection} from "./components/ContactsSection/ContactsSection.tsx";
import {Reviews} from "./components/Reviews/Reviews.tsx";
import {Carousel} from "react-responsive-carousel";

function App() {
  return (
    <>
      <Header/>
      <main>
        <div className="main-section">
          <div className="main-content">
            <div className={"headings"}>
              <h2 className="handwritten-text">Санкт Петербург</h2>
              <h1 className="heading">Апарт-отель <br/> «B.M. 55»</h1>
            </div>
            <h3 className="subheading">Прочувствуйте атмосферу Петербурга в самом сердце города!</h3>
            <BookingSection/>
          </div>
          <Carousel
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            interval={5000}
            autoPlay
            infiniteLoop
            swipeable
            className="image"
          >
            {Array.from({length: 7}, (_, i) => (`/Карусель/${i + 1}.jpg`)).map((path) => (
              <div key={path}>
                <Photo path={path}/>
              </div>
            ))}
          </Carousel>

        </div>
        <TextSection
          data={services}
          id={"services-section"}
        />
        <div className={"apartments-section section"} id={"apartments-section"}>
          <h1 className={"heading"}>
            <span className={"handwritten-text"}>Наши</span> Апартаменты
          </h1>
          <ApartmentsCarousel/>
        </div>
        <TextSection
          data={location}
          id={"location-section"}
        />
        <ContactsSection/>
        <div className={"section reviews-section"}>
          <h1 className={"heading"}>
            <span className={"handwritten-text"}>Наши</span> Отзывы
          </h1>
          <Reviews/>
        </div>
      </main>
      <BookingIFrame/>
    </>
  )
}

export default App;
