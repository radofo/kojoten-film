import React, { ReactNode, useCallback, useEffect, useState } from "react"
import { BackgroundMedia, MediaImage } from "../types/general"
import { createSrcSet } from "../utils/fetch"
import {
  BackgroundMediaContainer,
  BackgroundMediaContent,
  Image,
  Video,
} from "./MediaDivStyles"
import { screenSizes } from "../styles/theme"

type MediaType = "video" | "image"

// MEDIA DIV ============================================================================================================
type MediaDivProps = {
  children?: ReactNode
  media: BackgroundMedia
  show: MediaType
  link?: string | null
  cursorPlayButton?: boolean
  onPlaybackChanged?: (isPlaying: boolean) => void
  zoomImageOnHover?: boolean
  roundedCorners?: boolean
}
const MediaDiv = ({
  media,
  show,
  children,
  link,
  onPlaybackChanged,
  zoomImageOnHover,
  roundedCorners,
}: MediaDivProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoExists = media.video !== undefined
  const mediaToShow = videoExists && show === "video" ? "video" : "image"

  function handlePlaybackChanged(isPlaying: boolean) {
    setIsVideoPlaying(isPlaying)
    onPlaybackChanged?.(isPlaying)
  }

  return (
    <BackgroundMediaContainer
      zoomImageOnHover={zoomImageOnHover ?? false}
      cursorPlayButton={!!link}
      to={link}
    >
      {videoExists && (
        <BackgroundVideo
          media={media}
          show={mediaToShow}
          onPlaybackChanged={handlePlaybackChanged}
          roundedCorners={roundedCorners}
        />
      )}
      <BackgroundImage
        roundedCorners={roundedCorners}
        image={media.image}
        showImage={!isVideoPlaying}
      />
      <BackgroundMediaContent layer={100}>{children}</BackgroundMediaContent>
    </BackgroundMediaContainer>
  )
}
export default MediaDiv

// BACKGROUND VIDEO===================================================================================================
type BackgroundVideoProps = {
  media: BackgroundMedia
  show: MediaType
  onPlaybackChanged?: (isPlaying: boolean) => void
  roundedCorners?: boolean
}
const BackgroundVideo = ({
  media,
  show,
  onPlaybackChanged,
  roundedCorners,
}: BackgroundVideoProps) => {
  const [videoDomNode, setVideoDomNode] = useState<HTMLVideoElement | null>(
    null
  )

  const [imgSrc] = media?.image?.src
    ? createSrcSet({ src: media?.image.src, size: "1600" })
    : []

  useEffect(() => {
    if (!videoDomNode) {
      return
    }
    videoDomNode.defaultMuted = true
    videoDomNode.muted = true
  }, [videoDomNode])

  async function playOrPause(video: HTMLVideoElement | null) {
    if (show === "video" && !isVideoPlaying(video)) {
      try {
        await video?.play()
      } catch (e) {
        console.log(e)
      }
    } else if (show === "image" && isVideoPlaying(video)) {
      try {
        await video?.load()
      } catch (e) {
        console.log(e)
      }
    }
  }
  playOrPause(videoDomNode)

  const onRefChange = useCallback((videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      setVideoDomNode(videoElement)
      playOrPause(videoElement)
    }
  }, [])

  return (
    <BackgroundMediaContent roundedCorners={roundedCorners} layer={88}>
      <Video
        onTimeUpdate={() => {
          if (isVideoPlaying(videoDomNode)) {
            onPlaybackChanged?.(true)
          }
        }}
        onAbort={() => {
          onPlaybackChanged?.(false)
        }}
        ref={onRefChange}
        key={media?.video}
        poster={imgSrc}
        src={media?.video}
        loop
        muted
        playsInline
      />
    </BackgroundMediaContent>
  )
}

// BACKGROUND IMAGE============================================================================================================
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

const isVideoPlaying = (video: HTMLVideoElement | null) => {
  if (!video) return false

  return !!(
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2
  )
}
