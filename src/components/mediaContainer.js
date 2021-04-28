import React from "react"
import { isMobile } from "react-device-detect"
import styled from "styled-components"
import { createSrcSet } from "../utils/fetch"
import { Link } from "gatsby"
import { PlayButton } from "./icons/PlayButton"

const MediaContainerStyles = styled(props => {
  return props.islink ? <Link {...props} /> : <div {...props} />
})`
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 9;
  cursor: ${props => (props.islink ? "url('/play.svg'), pointer" : "auto")};
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
  filter: ${props => props.filters};
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
  children,
  media,
  customLink,
  overlayOnHover = false,
  mobilePlayOptOut = false,
}) => {
  let imgSrc
  let imgSrcSet
  if (media && media.horizontalImage) {
    imgSrc = createSrcSet(media.horizontalImage.src)[0]
    imgSrcSet = createSrcSet(media.horizontalImage.src)[1]
  }
  const displayMobilePlayButton =
    isMobile && !mobilePlayOptOut && customLink?.length > 0
  return (
    <MediaContainerStyles
      islink={customLink ? 1 : 0}
      exact="true"
      to={customLink}
    >
      {media.horizontalVideo ? (
        <Video autoPlay muted loop playsInline key={media.horizontalVideo}>
          <source src={media.horizontalVideo} type="video/mp4"></source>
        </Video>
      ) : (
        <Image src={imgSrc} srcSet={imgSrcSet} alt="" filters={media.filters} />
      )}
      {children}
      {displayMobilePlayButton && <PlayButton size={50} />}
      {overlayOnHover && <Overlay />}
    </MediaContainerStyles>
  )
}

export default MediaContainer
