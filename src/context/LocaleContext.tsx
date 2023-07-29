import React, { createContext, useEffect, useState } from "react"

export type Locale = "de" | "en"

type LocaleContextType = {
  locale: Locale
  updateLocale: (newLocale: Locale) => void
}
const defaultContextState: LocaleContextType = {
  locale: "de",
  updateLocale: () => {},
}

export const LocaleContext =
  createContext<LocaleContextType>(defaultContextState)

const localLsKey = "kojotenLanguage"

export const LocaleContextProvider = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(defaultContextState.locale)

  useEffect(() => {
    const storageLocale = localStorage.getItem(localLsKey) as Locale
    if (storageLocale) {
      setLocale(storageLocale)
    }
  }, [])

  const updateLocale = (newLocale: Locale) => {
    if (typeof Storage !== "undefined") {
      localStorage.setItem(localLsKey, newLocale)
    }
    setLocale(newLocale)
  }

  return (
    <LocaleContext.Provider value={{ locale, updateLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
