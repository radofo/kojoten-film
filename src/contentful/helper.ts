import { Image, i18Any } from "./types"

export function mapI18nField(obj: i18Any): i18Any {
  return {
    en: obj?.en ?? obj?.de,
    de: obj?.de,
  }
}

export function mapVideo(itemField: any): string | undefined {
  return itemField?.de?.fields?.file?.de?.url
}

export function mapImage(imageFields: any, altText: string): Image | undefined {
  if (!imageFields) return

  const img: Image = {
    title: imageFields?.title?.de ?? altText,
    url: imageFields?.file?.de?.url,
    contentType: imageFields?.file?.de?.contentType,
    width: imageFields?.file?.de?.details?.image?.width,
    height: imageFields?.file?.de?.details?.image?.height,
  }

  return img
}

export function mapImages(obj: any, altText: string): Image[] {
  if (!obj?.de) return []

  return obj.de.map((image, index) =>
    mapImage(image?.fields, `${altText}_${index}`)
  )
}

export function mapStringArray(obj: any): string[] {
  return obj?.de ?? []
}

export function mapOptionalField(contentfulValue: any, field: string): any {
  return contentfulValue || contentfulValue === 0
    ? { [field]: contentfulValue }
    : {}
}
