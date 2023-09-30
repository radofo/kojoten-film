export type MediaImage = {
  src?: string
  width?: number
  height?: number
  srcMobile?: string
  filters?: string
}
export type MediaVideo = {
  src?: string
  filters?: string
}
export type BackgroundMedia = {
  image?: MediaImage
  video?: MediaVideo
  vimeoId?: number
}

type ResponsiveSliderConfig = {
  fluid: boolean
  fullscreen: boolean
  spaceBetween: number
  alignment: "left" | "center"
  arrowSlideOverlap: boolean
}

export type SliderConfig = {
  loop: boolean
  desktop: ResponsiveSliderConfig
  mobile: ResponsiveSliderConfig
  sliderHeight?: string
}

export type CommercialOverviewType = "left" | "right" | "center"

export type MediaType = "video" | "image"

export type PlaybackState = "playing" | "paused" | "idle"
