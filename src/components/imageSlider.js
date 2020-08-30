import React, { useState, useEffect, useRef } from "react"
import FilmPoster from "../components/filmPoster"
import styled, { keyframes } from "styled-components"
import { sliderSpeedFactor, getNodeListWidth } from "../utils/slider"
import { screenSizes } from "../utils/mediaqueries"
// 3rd Party
import SwiperCore, { Navigation, Mousewheel, Scrollbar, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import "../styles/swiper.css"

SwiperCore.use([Navigation, Mousewheel, Scrollbar, Autoplay])

// Styled Components
const animateBatch = batchWidth => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-${batchWidth}px);
  }
`
const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  transform: translateX(0);
  animation: ${props => animateBatch(props.batchWidth)}
    ${props => {
      return props.batchWidth / sliderSpeedFactor
    }}s
    linear infinite;
  animation-fill-mode: forwards;
  animation-play-state: ${props => {
    return props.play ? "play" : "paused"
  }};
`

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
  left: ${props => {
    return props.left ? 0 : "initial"
  }};
  right: ${props => {
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
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [films])

  const handleResize = () => {
    setVh(window.innerHeight || "100vh")
  }

  const handleClick = () => {
    swiperRef.autoplay.running
      ? swiperRef.autoplay.stop()
      : swiperRef.autoplay.start()
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
        <NavButton left>
          <i className="fa fa-chevron-left swiper-prev"></i>
        </NavButton>
        <NavButton right>
          <i className="fa fa-chevron-right swiper-next"></i>
        </NavButton>
      </Swiper>
    </div>
  ) : (
    <div></div>
  )
}

export default ImageSlider
