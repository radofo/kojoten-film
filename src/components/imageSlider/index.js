import React from "react"
import FilmPoster from "../filmPoster"
import { NavButton } from "./imageSliderStyles"
import { Navigation, Mousewheel, Scrollbar, Autoplay, FreeMode } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/bundle"
import "../../styles/swiper.css"
import { ChevronRight, ChevronLeft } from "react-feather"

const ImageSlider = ({ films, height, locale }) => {
  return films.length > 0 ? (
    <div id="imageSlider">
      <Swiper
        modules={[Navigation, Mousewheel, Scrollbar, Autoplay, FreeMode]}
        initialSlide={0}
        slidesPerView="auto"
        freeMode={{
          enabled: true,
          momentumRatio: 0.5,
        }}
        spaceBetween={0}
        autoplay={true}
        loop
        mousewheel
        loopedSlides={films.length}
        followFinger={true}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        speed={500}
      >
        {films.map((film) => {
          return (
            <SwiperSlide
              key={`${film?.sys?.id}${film?.fields?.url}${film?.fields?.url}`}
              style={{ width: "initial" }}
            >
              <FilmPoster height={height} locale={locale} film={film} />
            </SwiperSlide>
          )
        })}
        <NavButton className="swiper-prev" left>
          <ChevronLeft size={50} />
        </NavButton>
        <NavButton className="swiper-next" right>
          <ChevronRight size={50} />
        </NavButton>
      </Swiper>
    </div>
  ) : (
    <div></div>
  )
}

export default ImageSlider
