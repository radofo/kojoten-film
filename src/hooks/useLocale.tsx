import { useEffect, useState } from "react"
import { defaultLocale } from "../utils/fetch"

export type Locale = "de" | "en"

export function useLocale(location: any) {
  const { state } = location
  const initialLocale = state?.locale ? state.locale : defaultLocale
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    const storageLocale = localStorage.getItem("kojotenLanguage") as Locale
    if (storageLocale && initialLocale !== storageLocale) {
      setLocale(storageLocale)
    }
  }, [])

  const changeLocale = (newLocale) => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  return {
    locale,
    changeLocale,
  }
}
