import React from "react"
import { isMobile } from "react-device-detect"
import { createSrcSet } from "../utils/fetch"
import { PlayButton } from "./icons/PlayButton"
import { screenSizes } from "../styles/theme"
import {
  Image,
  MediaContainerStyles,
  Overlay,
  Video,
} from "./MediaContainerStyles"

const MediaContainer = ({
  children = null,
  media,
  playbackLink,
  overlayOnHover = false,
  mobilePlayOptOut = false,
}) => {
  const [imgSrc, imgSrcSet] = media?.image?.src
    ? createSrcSet({ src: media.image.src, size: "1600" })
    : []
  const [, imgSrcSetMobile] = media?.image?.srcMobile
    ? createSrcSet({ src: media.image.srcMobile, size: "1600" })
    : []

  const displayMobilePlayButton =
    isMobile && !mobilePlayOptOut && playbackLink?.length > 0

  return (
    <MediaContainerStyles
      islink={playbackLink ? 1 : 0}
      exact="true"
      to={playbackLink}
    >
      {media?.video ? (
        <Video autoPlay muted loop playsInline key={media.video}>
          <source src={media.video} type="video/mp4"></source>
        </Video>
      ) : imgSrcSetMobile ? (
        <picture>
          <source
            srcSet={imgSrcSet}
            media={`(min-width: ${screenSizes.desktop}px)`}
          />
          <source srcSet={imgSrcSetMobile} media={`(min-width: 1px)`} />
          <Image
            src={imgSrc}
            srcSet={imgSrcSet}
            alt=""
            filters={media?.image?.filters}
          />
        </picture>
      ) : (
        <Image
          src={imgSrc}
          srcSet={imgSrcSet}
          alt=""
          filters={media?.image?.filters}
        />
      )}
      {children}
      {displayMobilePlayButton && <PlayButton size={50} />}
      {overlayOnHover && <Overlay />}
    </MediaContainerStyles>
  )
}

export default MediaContainer
