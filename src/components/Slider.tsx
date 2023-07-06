import React, { ReactNode } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper"
import { ChevronLeft, ChevronRight } from "react-feather"
import {
  NavContainer,
  SliderContainer,
  SliderNavigation,
  SwiperArea,
} from "./SliderStyles"
import "swiper/css/bundle"
import { duplicateSlides } from "../utils/slider"
import { screenSizes } from "../styles/theme"

interface SliderProps {
  slidesData: any[]
  contentToJsx: (slideContent: any) => ReactNode
}

const Slider = ({ slidesData, contentToJsx }: SliderProps) => {
  if (!slidesData.length) {
    return null
  }

  const renderSlidesData = duplicateSlides(slidesData, 1)

  return (
    <SliderContainer>
      <NavContainer left={true}>
        <SliderNavigation className="swiper-prev" left>
          <ChevronLeft size={50} />
        </SliderNavigation>
      </NavContainer>
      <SwiperArea>
        <Swiper
          modules={[Navigation, Mousewheel, Scrollbar, FreeMode]}
          initialSlide={0}
          slidesPerView="auto"
          breakpoints={{
            [screenSizes.tablet]: {
              centeredSlides: false,
            },
          }}
          centeredSlides
          centerInsufficientSlides
          freeMode={{
            enabled: true,
            momentumRatio: 0.5,
          }}
          spaceBetween={20}
          mousewheel
          followFinger={true}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
        >
          {renderSlidesData.map((thisSlideData, index) => {
            return (
              <SwiperSlide key={JSON.stringify(thisSlideData.key)}>
                {contentToJsx(thisSlideData)}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </SwiperArea>
      <NavContainer left={false}>
        <SliderNavigation className="swiper-next" right>
          <ChevronRight size={50} />
        </SliderNavigation>
      </NavContainer>
    </SliderContainer>
  )
}

export default Slider
