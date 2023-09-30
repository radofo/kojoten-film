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
import { CommercialOverviewType, PlaybackState } from "../types/general"
import MediaDiv from "./MediaDiv"
import { fromCommercialToBackgroundMedia } from "../utils/media"

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
  const [realVideoPlaybackState, setRealVideoPlaybackState] =
    useState<PlaybackState>("idle")

  function onVideoPlaybackChanged(isPlaying: PlaybackState) {
    setRealVideoPlaybackState(isPlaying)
  }

  const mediaWidth = commercial?.poster?.width
  const mediaHeight = commercial?.poster?.height
  let mediaRatio = 16 / 9

  if (mediaWidth && mediaHeight) {
    mediaRatio = mediaWidth / mediaHeight
  }

  return (
    <Container
      overviewType={overviewType}
      ratio={mediaRatio}
      commercialWidth={commercialWidth}
    >
      <MediaDiv
        media={fromCommercialToBackgroundMedia(commercial)}
        link={commercial.vimeoId ? `/media/c/${commercial.url}` : null}
        onPlaybackChanged={onVideoPlaybackChanged}
        zoomImageOnHover={true}
        roundedCorners={overviewType !== "center"}
        videoMode="playOnHover"
      >
        <CommercialInfosContainer overviewType={overviewType}>
          <CommercialInfos
            className={
              realVideoPlaybackState === "playing" ? "fadeOnHover" : ""
            }
          >
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
