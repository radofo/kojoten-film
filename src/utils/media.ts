import { TCommercial } from "../contentful/commercial"
import { BackgroundMedia } from "../types/general"

export function fromCommercialToBackgroundMedia(
  commercial: TCommercial
): BackgroundMedia {
  const commercialMedia: BackgroundMedia = {
    image: {
      src: commercial?.poster?.url,
      width: commercial.poster?.width,
      height: commercial?.poster?.height,
    },
    video: commercial.posterVideo,
    vimeoId: commercial?.vimeoId,
  }

  return commercialMedia
}
