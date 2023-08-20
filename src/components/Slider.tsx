import React, { ReactNode, useState } from "react"
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
import { SliderConfig } from "../types/general"

interface SliderProps<T> {
  slidesData: T[]
  contentToJsx: (
    slideContent: T,
    index: number,
    playVideo?: boolean
  ) => ReactNode
  config: SliderConfig
  onSlideChange?: (sliderInfo: { index: number }) => void
  onHover?: () => void
  onHoverOut?: () => void
  playActiveVideo?: boolean
  children?: ReactNode
}

const Slider = <T extends {}>({
  slidesData,
  contentToJsx,
  config,
  onSlideChange,
  playActiveVideo = false,
  onHover,
  onHoverOut,
  children,
}: SliderProps<T>) => {
  if (!slidesData.length || !config) {
    return null
  }
  const [activeIndex, setActiveIndex] = useState(0)

  const renderSlidesData = duplicateSlides(slidesData, 1)

  return (
    <SliderContainer
      sliderHeight={config?.sliderHeight}
      onMouseEnter={() => onHover?.()}
      onMouseLeave={() => onHoverOut?.()}
    >
      <NavContainer
        left={true}
        overlapDesktop={config.desktop.arrowSlideOverlap}
        overlapMobile={config.mobile.arrowSlideOverlap}
      >
        <SliderNavigation className="swiper-prev" left>
          <ChevronLeft size={50} />
        </SliderNavigation>
      </NavContainer>
      <SwiperArea isHeightDefinedByContainer={!!config.sliderHeight}>
        <Swiper
          modules={[Navigation, Mousewheel, Scrollbar, FreeMode]}
          initialSlide={0}
          followFinger={true}
          loop={config.loop}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          breakpoints={{
            [screenSizes.tablet]: {
              mousewheel: config.desktop.fluid,
              centeredSlides: config.desktop.alignment === "center",
              centerInsufficientSlides: config.desktop.alignment === "center",
              freeMode: {
                enabled: config.desktop.fluid,
                momentumRatio: 0.5,
              },
              slidesPerView: config.desktop.fullscreen ? 1 : "auto",
              spaceBetween: config.desktop.spaceBetween,
            },
          }}
          mousewheel={config.mobile.fluid}
          centeredSlides={config.mobile.alignment === "center"}
          centerInsufficientSlides={config.mobile.alignment === "center"}
          freeMode={{
            enabled: config.mobile.fluid,
            momentumRatio: 0.5,
          }}
          slidesPerView={config.mobile.fullscreen ? 1 : "auto"}
          spaceBetween={config.mobile.spaceBetween}
          onSlideChangeTransitionEnd={(swiper) => {
            onSlideChange?.({ index: swiper.realIndex })
            setActiveIndex(swiper.realIndex)
          }}
        >
          {renderSlidesData.map((thisSlideData, index) => {
            const playThisVideo = activeIndex === index && playActiveVideo
            return (
              <SwiperSlide key={JSON.stringify(thisSlideData)}>
                {contentToJsx(thisSlideData, index, playThisVideo)}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </SwiperArea>
      {children}
      <NavContainer
        left={false}
        overlapDesktop={config.desktop.arrowSlideOverlap}
        overlapMobile={config.mobile.arrowSlideOverlap}
      >
        <SliderNavigation className="swiper-next" right>
          <ChevronRight size={50} />
        </SliderNavigation>
      </NavContainer>
    </SliderContainer>
  )
}

export default Slider
