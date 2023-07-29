import { mapI18nField, mapImage, mapImages } from "./helper"
import { Image, i18nString, i18nDocument } from "./types"

export type Firmensitz = {
  plz: number
  stadt: string
  email: string
  telefon: string
  land: i18nString
  straeUndHausnummer: i18nString
}

// TODO: i18n for every field to make easier to extend
export type AboutUsPage = {
  beschreibungHeader?: i18nString
  beschreibungContent?: i18nDocument
  firmensitzeHeader?: i18nString
  firmensitze?: Firmensitz[]
  logosRechtsUnten?: Image[]
  logosLinksUnten?: Image[]
}

export function fromContentfulResponseToAboutUsPage(
  response: any
): AboutUsPage | undefined {
  const aboutUsPage = response?.items?.[0]?.fields
  if (!aboutUsPage) return

  return {
    beschreibungHeader: mapI18nField(aboutUsPage.beschreibungHeader),
    beschreibungContent: mapI18nField(aboutUsPage.beschreibungContent),
    firmensitzeHeader: mapI18nField(aboutUsPage.firmensitzeHeader),
    firmensitze:
      aboutUsPage.firmensitze?.de?.map((sitz) => {
        const fields = sitz?.fields
        const firmensitz: Firmensitz = {
          email: fields.email?.de,
          stadt: fields.stadt?.de,
          plz: fields.plz?.de,
          telefon: fields.telefon?.de,
          land: mapI18nField(fields.land),
          straeUndHausnummer: mapI18nField(fields.straeUndHausnummer),
        }
        return firmensitz
      }) ?? [],
    logosLinksUnten: mapImages(
      aboutUsPage.logosLinksUnten,
      "an image on the bottom left of the page"
    ),
    logosRechtsUnten: mapImages(
      aboutUsPage.logosRechtsUnten,
      "an image on the bottom right of the page"
    ),
  }
}
