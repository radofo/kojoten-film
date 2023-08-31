import React, { ReactNode, useCallback, useState } from "react"
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
  playActiveVideo?: boolean
  playActiveVideoOnHover?: boolean
  children?: ReactNode
}

const Slider = <T extends {}>({
  slidesData,
  contentToJsx,
  config,
  onSlideChange,
  playActiveVideo = false,
  playActiveVideoOnHover = true,
  children,
}: SliderProps<T>) => {
  if (!slidesData.length || !config) {
    return null
  }
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [sliderContainerEl, setSliderContainerEl] =
    useState<HTMLElement | null>(null)

  const renderSlidesData = duplicateSlides(slidesData, 1)

  function mouseOver(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsHovered(true)
  }
  function mouseOut(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = sliderContainerEl?.getBoundingClientRect()
    if (rect) {
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (!isInside) {
        setIsHovered(false)
      }
    }
  }

  const onRefChange = useCallback((containerElement: HTMLElement | null) => {
    if (containerElement) {
      setSliderContainerEl(containerElement)
    }
  }, [])

  return (
    <SliderContainer
      ref={onRefChange}
      sliderHeight={config?.sliderHeight}
      onMouseEnter={(e) => {
        mouseOver(e)
      }}
      onMouseLeave={(e) => {
        mouseOut(e)
      }}
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
              centerInsufficientSlides: true,
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
          centerInsufficientSlides
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
            const activeCheckPassed =
              playActiveVideo || playActiveVideoOnHover
                ? activeIndex === index
                : false
            const hoverCheckPassed = playActiveVideoOnHover ? isHovered : true
            const playSlideVideo = activeCheckPassed && hoverCheckPassed

            return (
              <SwiperSlide key={JSON.stringify(thisSlideData)}>
                {contentToJsx(thisSlideData, index, playSlideVideo)}
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
