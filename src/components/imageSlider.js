import React, { useState, useEffect } from "react"
import FilmPoster from "../components/filmPoster"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"
// 3rd Party
import SwiperCore, { Navigation, Mousewheel, Scrollbar, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import "../styles/swiper.css"
import { ChevronRight, ChevronLeft } from "react-feather"
SwiperCore.use([Navigation, Mousewheel, Scrollbar, Autoplay])

// Styled Components
const NavButton = styled.button`
  color: #c1c1c1;
  outline: none;
  opacity: 0.4;
  font-size: 2em;
  background: rgba(0, 0, 0, 0);
  border: 0px solid rgba(0, 0, 0, 0);
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  @media ${screenSizes.desktop} {
    font-size: 2.5em;
  }
  z-index: 9999;
  position: fixed;
  left: ${(props) => {
    return props.left ? 0 : "initial"
  }};
  right: ${(props) => {
    return props.right ? 0 : "initial"
  }};
  top: 50%;
  transform: translateY(-50%);
  padding: var(--padding-sides);
`

// React Component
const ImageSlider = ({ films, overlayVisible, locale }) => {
  const [vh, setVh] = useState("")
  const [swiperRef, setSwiperRef] = useState(null)

  useEffect(() => {
    setVh(window.innerHeight || "100vh")
    window.addEventListener("resize", handleResize)
    console.log("films: ", films)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [films])

  const handleResize = () => {
    setVh(window.innerHeight || "100vh")
  }

  return films.length > 0 ? (
    <div id="imageSlider">
      <Swiper
        onSwiper={setSwiperRef}
        style={{ height: vh }}
        initialSlide={0}
        slidesPerView="auto"
        freeMode
        spaceBetween={0}
        autoplay={{ delay: 3000 }}
        loop
        mousewheel
        updateOnWindowResize
        watchSlidesVisibility
        loopedSlides={films.length}
        freeModeMomentumRatio={0.5}
        followFinger={true}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        speed={400}
      >
        {films.map((film, index) => {
          return (
            <SwiperSlide key={index}>
              <FilmPoster locale={locale} film={film}></FilmPoster>
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
