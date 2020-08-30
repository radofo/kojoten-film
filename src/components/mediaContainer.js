import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { createSrcSet } from "../utils/fetch"
import { Link } from "gatsby"

const MediaContainerStyles = styled(props => {
  return props.islink ? <Link {...props} /> : <div {...props} />
})`
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 99;
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
  border: 1px solid black;
  filter: ${props => props.filters};
`

const MediaContainer = ({ children, media, customLink }) => {
  let imgSrc
  let imgSrcSet
  if (media && media.horizontalImage) {
    imgSrc = createSrcSet(media.horizontalImage.src)[0]
    imgSrcSet = createSrcSet(media.horizontalImage.src)[1]
  }

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
        <Image
          src={imgSrc}
          srcSet={imgSrcSet}
          alt="BG-image"
          filters={media.filters}
        />
      )}
      {children}
    </MediaContainerStyles>
  )
}

export default MediaContainer
