import React, { useState, useEffect, FC, ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import { Helmet } from "react-helmet"
import Header from "./header"
import MobileMenu from "./MobileMenu"
import { SocialMediaContextProvider } from "./context/SocialMedia"
import { standardTheme } from "../styles/theme"
import {
  Body,
  GlobalStyle,
  LayoutContainer,
} from "../styles/pageStyles/LayoutStyles"

type LayoutProps = {
  transparentHeader: boolean
  overlayDecided?: boolean
  locale: string
  backButton?: boolean
  changeLocale: (newLocale: string) => void
  children: ReactNode
}

const Layout = ({
  children,
  transparentHeader = false,
  backButton = false,
  overlayDecided = true,
  locale,
  changeLocale,
}: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "initial"
  }, [])

  const handleClick = () => {
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "initial"
    }
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <LayoutContainer>
      <Helmet>
        <link rel="icon" href="/favicon.svg" />
        <link href="/fontawesome/css/all.css" rel="stylesheet" />
        <title>Kojoten Filmproduktion</title>
      </Helmet>
      <ThemeProvider theme={standardTheme}>
        <SocialMediaContextProvider>
          <GlobalStyle />
          {overlayDecided && (
            <React.Fragment>
              <Header
                handleClick={handleClick}
                isMenuOpen={isMenuOpen}
                transparentHeader={transparentHeader}
                backButton={backButton}
                changeLocale={changeLocale}
                locale={locale}
              />
              <MobileMenu
                locale={locale}
                changeLocale={changeLocale}
                isMenuOpen={isMenuOpen}
              />
            </React.Fragment>
          )}
          <Body>{children}</Body>
        </SocialMediaContextProvider>
      </ThemeProvider>
    </LayoutContainer>
  )
}

export default Layout
