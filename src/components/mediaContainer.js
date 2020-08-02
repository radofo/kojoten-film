import React, { useEffect } from "react"
import styled from "styled-components"

const MediaContainerStyles = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
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
  filter: ${props => props.filters};
`

const MediaContainer = ({ children, media }) => {
  return (
    <MediaContainerStyles>
      {media.horizontalVideo ? (
        <Video autoPlay muted loop playsInline key={media.horizontalVideo}>
          <source src={media.horizontalVideo} type="video/mp4"></source>
        </Video>
      ) : (
        <Image
          src={media && media.horizontalImage && media.horizontalImage.src}
          srcSet={
            media && media.horizontalImage && media.horizontalImage.srcSet
          }
          filters={media.filters}
        />
      )}
      {children}
    </MediaContainerStyles>
  )
}

export default MediaContainer
