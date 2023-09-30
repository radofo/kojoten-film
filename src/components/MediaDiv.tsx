import React, { ReactNode, useCallback, useEffect, useState } from "react"
import { BackgroundMedia, MediaImage, PlaybackState } from "../types/general"
import { createSrcSet } from "../utils/fetch"
import {
  BackgroundMediaContainer,
  BackgroundMediaContent,
  Image,
} from "./MediaDivStyles"
import { screenSizes } from "../styles/theme"
import BackgroundVideo from "./BackgroundVideo"

/**
 * children?: content that is shown on top of the media
 * media: image and /or video that should be shown in the background of the container
 * link: when clicking on the container, where should the user be redirected to? If there is a link, the cursor will be a play button
 * onPlaybackChanged: callback that is fired when the video is played / paused
 * onHoverChanged: callback that is fired when the MediaDiv is hovered
 * zoomImageOnHover: hover effect for images, whereby the image is zoomed in
 * roundedCorneres: should the container have a borderRadius or not?
 * videoMode: should the video play/pause on hover or should the playback be controlled by requestedVideoPlaybackState
 * detectHoverByArea: if true "hover" means: the mouse is still over the area of the element, otherwise if mouse enters an (absolute positioned) sibling, the hover state becomes false
 * requestVideoPlaybackState: 'playing', 'paused' or 'idle', only has an effect if videoMode = controlled. Might not follow request (see Safari issues)
 */
type MediaDivProps = {
  children?: ReactNode
  media: BackgroundMedia
  link?: string | null
  onPlaybackChanged?: (videoPlaybackState: PlaybackState) => void
  onHoverChanged?: (isHovered: boolean) => void
  zoomImageOnHover?: boolean
  roundedCorners?: boolean
  videoMode?: "playOnHover" | "controlled"
  detectHoverByArea?: boolean
  requestedVideoPlaybackState?: PlaybackState
}

const MediaDiv = ({
  children,
  media,
  link,
  onPlaybackChanged,
  onHoverChanged,
  zoomImageOnHover,
  roundedCorners,
  videoMode,
  detectHoverByArea = false,
  requestedVideoPlaybackState,
}: MediaDivProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [realVideoPlaybackState, setRealVideoPlaybackState] =
    useState<PlaybackState>("idle")
  const [mediaDivEl, setMediaDivEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    onHoverChanged?.(isHovered)
  }, [isHovered])

  const videoExists = media.video?.src !== undefined

  function mouseOver(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsHovered(true)
  }
  function mouseOut(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (detectHoverByArea) {
      const rect = mediaDivEl?.getBoundingClientRect()
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
    } else {
      setIsHovered(false)
    }
  }
  function onVideoPlaybackChanged(isPlaying: PlaybackState) {
    setRealVideoPlaybackState(isPlaying)
    onPlaybackChanged?.(isPlaying)
  }
  const onRefChange = useCallback((containerElement: HTMLElement | null) => {
    if (containerElement) {
      setMediaDivEl(containerElement)
    }
  }, [])

  const showImage = realVideoPlaybackState === "idle"

  let videoPlaybackState: PlaybackState = "idle"
  if (videoMode === "playOnHover" && isHovered) {
    videoPlaybackState = "playing"
  } else if (videoMode === "controlled" && requestedVideoPlaybackState) {
    videoPlaybackState = requestedVideoPlaybackState
  }

  return (
    <div style={{ width: "100%", height: "100%" }} ref={onRefChange}>
      <BackgroundMediaContainer
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
        zoomImageOnHover={zoomImageOnHover ?? false}
        cursorPlayButton={!!link}
        to={link}
      >
        {videoExists && (
          <BackgroundVideo
            media={media}
            requestedPlaybackState={videoPlaybackState}
            realPlaybackState={realVideoPlaybackState}
            onPlaybackChanged={onVideoPlaybackChanged}
            roundedCorners={roundedCorners}
          />
        )}
        <BackgroundImage
          roundedCorners={roundedCorners}
          image={media.image}
          showImage={showImage}
        />
        <BackgroundMediaContent layer={100}>{children}</BackgroundMediaContent>
      </BackgroundMediaContainer>
    </div>
  )
}
export default MediaDiv

type BackgroundImageProps = {
  showImage: boolean
  image?: MediaImage
  roundedCorners?: boolean
}
const BackgroundImage = ({
  image,
  showImage,
  roundedCorners,
}: BackgroundImageProps) => {
  const [imgSrc, imgSrcSet] = image?.src
    ? createSrcSet({ src: image.src, size: "1600" })
    : []
  const [, imgSrcSetMobile] = image?.srcMobile
    ? createSrcSet({ src: image.srcMobile, size: "1600" })
    : []
  const imgOpacity = showImage ? 1 : 0

  return (
    <BackgroundMediaContent roundedCorners={roundedCorners} layer={99}>
      <picture>
        <source
          srcSet={imgSrcSet}
          media={`(min-width: ${screenSizes.desktop}px)`}
        />
        <source srcSet={imgSrcSetMobile} media={`(min-width: 1px)`} />
        <Image
          src={imgSrc}
          srcSet={imgSrcSet}
          imgOpacity={imgOpacity}
          alt=""
          filters={image?.filters}
        />
      </picture>
    </BackgroundMediaContent>
  )
}
