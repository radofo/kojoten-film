import {
  mapI18nField,
  mapImage,
  mapImages,
  mapOptionalField,
  mapStringArray,
  mapVideo,
} from "./helper"
import { Image, i18nDocument, i18nString, i18nStrings } from "./types"

export type Film = {
  titel: i18nString
  filmstatus: i18nString
  position: number
  poster?: Image
  hintergrundBild?: Image
  hintergrundVideo?: string
  lngeInMinuten: number
  beschreibung: i18nDocument
  verleihVertrieb: Image[]
  koproduktionFrderungPartner: Image[]
  auszeichnungen: Image[]
  festivals: Image[]
  genres: i18nStrings
  vimeoId?: number
  url?: string
  cast: string[]
  casting: string[]
  cinematographer: string[]
  writers: string[]
  director: string[]
  producer: string[]
  produzentin: string[]
  koproduzentin: string[]
  szenenbild: string[]
  kostm: string[]
  maske: string[]
  montage: string[]
  sounddesign: string[]
  filmmusik: string[]
  farbkorrektur: string[]
}

export function fromContentfulResponseToFilms(response: any): Film[] {
  return response.items.map((item) => {
    return parseContentfulFilm(item.fields)
  })
}

export function parseContentfulFilm(itemFields: any): Film | undefined {
  if (!itemFields) return

  const film: Film = {
    titel: mapI18nField(itemFields.titel),
    filmstatus: mapI18nField(itemFields.filmstatus),
    position: itemFields.position?.de ?? 999,
    poster: mapImage(itemFields.poster?.de?.fields, "Poster"),
    hintergrundBild: mapImage(
      itemFields.hintergrundBild?.de?.fields,
      "Hintergrundbild"
    ),
    hintergrundVideo: mapVideo(itemFields.hintergrundVideo),
    beschreibung: itemFields.beschreibung,
    festivals: mapImages(itemFields.festivals, "Logo Festivals"),
    verleihVertrieb: mapImages(itemFields.verleihVertrieb, "Logo Festivals"),
    auszeichnungen: mapImages(itemFields.auszeichnungen, "Auszeichnung Logo"),
    koproduktionFrderungPartner: mapImages(
      itemFields.koproduktionFrderungPartner,
      "Logo Koproduktion Förderung Partner"
    ),
    genres: itemFields.genres, // multi-language
    lngeInMinuten: itemFields.lngeInMinuten?.de,
    cast: mapStringArray(itemFields.cast),
    casting: mapStringArray(itemFields.casting),
    cinematographer: mapStringArray(itemFields.cinematographer),
    writers: mapStringArray(itemFields.writers),
    director: mapStringArray(itemFields.director),
    producer: mapStringArray(itemFields.producer),
    produzentin: mapStringArray(itemFields.produzentin),
    koproduzentin: mapStringArray(itemFields.koproduzentin),
    szenenbild: mapStringArray(itemFields.szenenbild),
    kostm: mapStringArray(itemFields.kostm),
    maske: mapStringArray(itemFields.maske),
    montage: mapStringArray(itemFields.montage),
    sounddesign: mapStringArray(itemFields.sounddesign),
    filmmusik: mapStringArray(itemFields.filmmusik),
    farbkorrektur: mapStringArray(itemFields.farbkorrektur),
    ...mapOptionalField(itemFields.url?.de, "url"),
    ...mapOptionalField(itemFields.vimeoId?.de, "vimeoId"),
  }

  return film
}
