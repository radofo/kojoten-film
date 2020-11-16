import { useEffect, useState } from "react"
import { defaultLocale } from "../utils/fetch"

export const useLocale = state => {
  const initialLocale = state && state.locale ? state.locale : defaultLocale
  const [locale, setLocale] = useState(initialLocale)

  useEffect(() => {
    const storageLocale = localStorage.getItem("kojotenLanguage")
    if (storageLocale && initialLocale !== storageLocale) {
      setLocale(storageLocale)
    }
  }, [])

  const changeLocale = newLocale => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  return [locale, changeLocale]
}
