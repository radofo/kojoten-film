import React, { useContext, useState } from "react"
import { TCommercial } from "../contentful/commercial"
import {
  CommercialInfos,
  CommercialInfosContainer,
  Container,
  Kunde,
  KundeUndName,
  Name,
  Regisseur,
} from "./CommercialOverviewProjectStyles"
import { CommercialOverviewType } from "../types/general"
import MediaDiv from "./MediaDiv"
import { fromCommercialToBackgroundMedia } from "../utils/media"
import { VideoControllerContext } from "../context/VideoControllerContext"

type CommercialOverviewProjectProps = {
  commercial: TCommercial
  commercialWidth: number
  overviewType: CommercialOverviewType
}

const CommercialOverviewProject = ({
  commercial,
  commercialWidth,
  overviewType,
}: CommercialOverviewProjectProps) => {
  const { playbackWinner, startOverviewVideo, stopVideo } = useContext(
    VideoControllerContext
  )
  const [isPlaying, setIsPlaying] = useState(false)

  function mouseOver(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    startOverviewVideo(commercial?.url ?? null)
  }
  function mouseOut(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (commercial?.url) {
      stopVideo(commercial.url)
    }
  }

  const showThisVideo =
    playbackWinner.section === "overview" &&
    playbackWinner.videoUrl === commercial.url

  const mediaWidth = commercial?.poster?.width
  const mediaHeight = commercial?.poster?.height
  let mediaRatio = 16 / 9

  if (mediaWidth && mediaHeight) {
    mediaRatio = mediaWidth / mediaHeight
  }
  function onVideoPlaybackChanged(isPlaying: boolean) {
    setIsPlaying(isPlaying)
  }

  return (
    <Container
      overviewType={overviewType}
      ratio={mediaRatio}
      commercialWidth={commercialWidth}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
    >
      <MediaDiv
        media={fromCommercialToBackgroundMedia(commercial)}
        link={commercial.vimeoId ? `/media/c/${commercial.url}` : null}
        show={showThisVideo ? "video" : "image"}
        onPlaybackChanged={onVideoPlaybackChanged}
        zoomImageOnHover={true}
        roundedCorners={overviewType !== "center"}
      >
        <CommercialInfosContainer overviewType={overviewType}>
          <CommercialInfos className={isPlaying ? "fadeOnHover" : ""}>
            <KundeUndName overviewType={overviewType}>
              <Kunde>{commercial.kunde}</Kunde>
              <Name>{commercial.name}</Name>
            </KundeUndName>
            <Regisseur overviewType={overviewType}>
              {commercial.regisseur}
            </Regisseur>
          </CommercialInfos>
        </CommercialInfosContainer>
      </MediaDiv>
    </Container>
  )
}

export default CommercialOverviewProject
