export type MediaImage = {
  src?: string
  width?: number
  height?: number
  srcMobile?: string
  filters?: string
}
export type BackgroundMedia = {
  image?: MediaImage
  video?: string
  vimeoId?: number
}
export type Media = {
  image: MediaImage
  video?: string
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
