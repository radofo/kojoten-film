import React, { useCallback, useEffect, useState } from "react"
import { BackgroundMedia, PlaybackState } from "../types/general"
import { createSrcSet } from "../utils/fetch"
import { BackgroundMediaContent, Video } from "./MediaDivStyles"

type BackgroundVideoProps = {
  media: BackgroundMedia
  requestedPlaybackState: PlaybackState
  realPlaybackState: PlaybackState
  onPlaybackChanged?: (requestedPlaybackState: PlaybackState) => void
  roundedCorners?: boolean
}

const BackgroundVideo = ({
  media,
  requestedPlaybackState,
  roundedCorners,
  onPlaybackChanged,
}: BackgroundVideoProps) => {
  const [videoDomNode, setVideoDomNode] = useState<HTMLVideoElement | null>(
    null
  )

  const [imgSrc] = media?.image?.src
    ? createSrcSet({ src: media?.image.src, size: "1600" })
    : []

  useEffect(() => {
    ;(async () => {
      try {
        if (requestedPlaybackState === "playing") {
          await videoDomNode?.play()
        } else if (requestedPlaybackState === "paused") {
          await videoDomNode?.pause()
        } else if (requestedPlaybackState === "idle") {
          await videoDomNode?.load()
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [requestedPlaybackState, videoDomNode])

  const onRefChange = useCallback((videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      setVideoDomNode(videoElement)
    }
  }, [])

  return (
    <BackgroundMediaContent roundedCorners={roundedCorners} layer={88}>
      <Video
        onTimeUpdate={() => {
          if (isVideoPlaying(videoDomNode)) {
            onPlaybackChanged?.("playing")
          }
        }}
        onAbort={() => {
          onPlaybackChanged?.("idle")
        }}
        onPause={() => {
          if (videoDomNode?.paused && videoDomNode?.currentTime > 0) {
            onPlaybackChanged?.("paused")
          }
        }}
        ref={onRefChange}
        key={media?.video?.src}
        poster={imgSrc}
        src={media?.video?.src}
        filters={media?.video?.filters}
        loop
        muted
        playsInline
      />
    </BackgroundMediaContent>
  )
}
export default BackgroundVideo

const isVideoPlaying = (video: HTMLVideoElement | null) => {
  if (!video) return false

  return !!(
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2
  )
}
