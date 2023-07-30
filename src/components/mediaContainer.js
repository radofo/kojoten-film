import React from "react"
import { isMobile } from "react-device-detect"
import styled from "styled-components"
import { createSrcSet } from "../utils/fetch"
import { Link } from "gatsby"
import { PlayButton } from "./icons/PlayButton"
import { screenSizes } from "../styles/theme"

const MediaContainerStyles = styled((props) => {
  return props.islink ? <Link {...props} /> : <div {...props} />
})`
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 9;
  cursor: ${(props) => (props.islink ? "url('/play.svg'), pointer" : "auto")};
`
const Video = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  background: black;
  outline: 1px solid black;
  filter: ${(props) => props.filters};
`
const Overlay = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0;

  div:hover,
  a:hover > & {
    opacity: 0.5;
  }
`

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
