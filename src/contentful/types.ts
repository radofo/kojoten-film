import { Document } from "@contentful/rich-text-types"

export type i18Any = {
  en: any
  de: any
}

export type i18nString = {
  en: string
  de: string
}

export type i18nStrings = {
  en: string[]
  de: string[]
}

export type i18nDocument = {
  en: Document
  de: Document
}

export type Image = {
  title: string
  url: string
  contentType: string
  width: number
  height: number
}
