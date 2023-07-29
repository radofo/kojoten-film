import React from "react"
import "./src/styles/hamburgers.css"
import "./src/styles/customfonts.css"
import smoothscroll from "smoothscroll-polyfill"
import { LocaleContextProvider } from "./src/context/LocaleContext"
smoothscroll.polyfill()

export const wrapRootElement = ({ element }) => {
  return <LocaleContextProvider>{element}</LocaleContextProvider>
}
