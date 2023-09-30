import { TCommercial } from "../contentful/commercial"
import { Film } from "../contentful/film"
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
    video: {
      src: commercial.posterVideo,
    },
    vimeoId: commercial?.vimeoId,
  }

  return commercialMedia
}

export function fromFilmToBackgroundMedia(
  film: Film,
  filters: string
): BackgroundMedia {
  const filmMedia: BackgroundMedia = {
    image: {
      src: film.hintergrundBild?.url,
      width: film.poster?.width,
      height: film.poster?.height,
      filters,
    },
    video: {
      src: film.hintergrundVideo,
      filters,
    },
    vimeoId: film.vimeoId,
  }
  return filmMedia
}
