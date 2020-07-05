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

const MediaContainer = ({ children, media }) => {
  useEffect(() => {}, [media])
  return (
    <MediaContainerStyles>
      <Video autoPlay muted loop playsInline key={media.horizontalVideo}>
        <source src={media.horizontalVideo} type="video/mp4"></source>
      </Video>
      {children}
    </MediaContainerStyles>
  )
}

export default MediaContainer
