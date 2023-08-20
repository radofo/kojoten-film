import "swiper/css"
import "swiper/css/navigation"
import "../styles/swiper.css"
import React, { ReactNode, useContext, useRef, useState } from "react"
import {
  CommercialContainer,
  ScrollButton,
  SlideContent,
} from "../styles/pageStyles/CommercialStyles"
import { TCommercial } from "../contentful/commercial"
import { fromCommercialToBackgroundMedia } from "../utils/media"
import MediaDiv from "./MediaDiv"
import CommercialBasicInfo from "./CommercialBasicInfo"
import { SliderConfig } from "../types/general"
import Slider from "./Slider"
import CommercialOverview from "./CommercialOverview"
import { VideoControllerContext } from "../context/VideoControllerContext"
import { ChevronDown } from "react-feather"

const sliderConfig: SliderConfig = {
  loop: true,
  sliderHeight: "100%",
  desktop: {
    fluid: false,
    fullscreen: true,
    spaceBetween: 0,
    alignment: "center",
    arrowSlideOverlap: true,
  },
  mobile: {
    fluid: false,
    fullscreen: true,
    spaceBetween: 0,
    alignment: "center",
    arrowSlideOverlap: true,
  },
}

type CommercialContentProps = {
  commercials: TCommercial[]
}

const CommercialContent = ({ commercials }: CommercialContentProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const overviewRef = useRef<HTMLDivElement | null>(null)
  const { playbackWinner, startSliderVideo, stopVideo } = useContext(
    VideoControllerContext
  )

  function onSlideChange({ index }: { index: number }) {
    setActiveSlide(index)
  }
  function onSliderHovered() {
    startSliderVideo()
  }
  function onSliderHoverOut() {
    stopVideo()
  }

  return (
    <CommercialContainer>
      <Slider
        slidesData={commercials}
        contentToJsx={commercialsToSlides}
        playActiveVideo={playbackWinner.section === "slider"}
        config={sliderConfig}
        onSlideChange={onSlideChange}
        onHover={onSliderHovered}
        onHoverOut={onSliderHoverOut}
      >
        <ScrollButton
          onClick={() =>
            overviewRef?.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <ChevronDown size={50} />
        </ScrollButton>
      </Slider>
      <CommercialOverview
        activeIndex={activeSlide}
        overviewRef={overviewRef}
        overviewCommercials={commercials}
      />
    </CommercialContainer>
  )
}

export default CommercialContent

function commercialsToSlides(
  commercial: TCommercial,
  index: number,
  playVideo?: boolean
): ReactNode {
  const commercialMedia = fromCommercialToBackgroundMedia(commercial)
  const basicInfos = {
    kunde: commercial.kunde,
    name: commercial.name,
  }

  return (
    <SlideContent>
      <MediaDiv
        link={commercial.vimeoId ? `/media/c/${commercial.url}` : null}
        media={commercialMedia}
        show={playVideo ? "video" : "image"}
      >
        <CommercialBasicInfo details={basicInfos} />
      </MediaDiv>
    </SlideContent>
  )
}
