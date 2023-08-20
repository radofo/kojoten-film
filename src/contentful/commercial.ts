import { mapImage, mapOptionalField, mapVideo } from "./helper"
import { Image } from "./types"

export type TCommercial = {
  name: string
  position?: number
  kunde?: string
  poster?: Image
  posterVideo?: string
  regisseur?: string
  url?: string
  vimeoId?: number
}

export function fromContentfulReponseToCommercials(
  response: any
): TCommercial[] {
  return response.items.map((item) => {
    return parseContentfulCommercial(item.fields)
  })
}

export function parseContentfulCommercial(
  itemFields: any
): TCommercial | undefined {
  if (!itemFields?.poster?.de?.fields) return

  return {
    poster: mapImage(itemFields.poster.de.fields, "Poster"),
    posterVideo: mapVideo(itemFields.posterVideo),
    ...mapOptionalField(itemFields.name?.de, "name"),
    ...mapOptionalField(itemFields.kunde?.de, "kunde"),
    ...mapOptionalField(itemFields.regisseur?.de, "regisseur"),
    ...mapOptionalField(itemFields.url?.de, "url"),
    ...mapOptionalField(itemFields.vimeoId?.de, "vimeoId"),
    ...mapOptionalField(itemFields.position?.de, "position"),
  }
}
