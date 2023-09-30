import React, { createContext, useState } from "react"

type Section = "slider" | "overview"

type PlaybackWinner = {
  section: Section
  videoUrl: string | null
}

type VideoControllerContextType = {
  playbackWinner: PlaybackWinner
  startOverviewVideo: (url: string | null) => void
  stopVideo: (url?: string) => void
  startSliderVideo: () => void
}

export const VideoControllerContext = createContext<VideoControllerContextType>(
  {
    playbackWinner: { section: "slider", videoUrl: null },
    startOverviewVideo: () => {},
    stopVideo: () => {},
    startSliderVideo: () => {},
  }
)

export function VideoControllerContextProvider({ children }) {
  const [section, setSection] = useState<Section>("slider")
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  function startOverviewVideo(url: string | null) {
    setSection("overview")
    setVideoUrl(url)
  }
  function stopVideo(url?: string) {
    if (url === videoUrl) {
      setVideoUrl(null)
    }
    setSection("overview")
  }
  function startSliderVideo() {
    setSection("slider")
    setVideoUrl(null)
  }

  return (
    <VideoControllerContext.Provider
      value={{
        playbackWinner: { section, videoUrl },
        startOverviewVideo,
        stopVideo,
        startSliderVideo,
      }}
    >
      {children}
    </VideoControllerContext.Provider>
  )
}
