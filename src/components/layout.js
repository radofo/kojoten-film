// Libraries
import React, { useState, useEffect } from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { Helmet } from "react-helmet"
import favicon from "../media/favicon.svg"
// Children
import Header from "./header"
import MobileMenu from "./MobileMenu"
// Utils
import { headerHeight } from "../utils/window"
// Context
import { SocialMediaContextProvider } from "./context/SocialMedia"
// Fonts
import "../styles/customfonts.css"
// Themes
import { standardTheme } from "../styles/theme"

// ============== Global Styles & Variables ==============
const LayoutContainer = styled.div``
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body, html {
    font-family: "DarkerGrotesque", sans-serif;
    font-size: ${standardTheme.fontSizes.regularText};
    background-color: black;
    --padding-sides: 3%;
    --text-color: #fff;
    --header-bgcolor: #000;
    --header-bgcolor-transparent: rgba(0, 0, 0, 0);
    --header-height: ${headerHeight}px;
    --slider-speed-factor: 160;
    --active-route: #E3BA85;
    --highlight-color: #E3BA85;
    --default-font-size: 20px;
  }
  img:not([src]) {
    display: none;
  }
`

// ============== Styled Components ==============

const Body = styled.main``

// ============== Layout Component ==============
const Layout = ({
  children,
  transparentHeader,
  backButton,
  overlayDecided = true,
  locale,
  changeLocale,
}) => {
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
        <link rel="icon" href={favicon} />
        <link href="/fontawesome/css/all.css" rel="stylesheet"></link>
        <title>Kojoten Filmproduktion</title>
      </Helmet>
      <ThemeProvider theme={standardTheme}>
        <SocialMediaContextProvider>
          <GlobalStyle />
          <Body isMenuOpen={isMenuOpen} transparentHeader={transparentHeader}>
            {children}
          </Body>
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
        </SocialMediaContextProvider>
      </ThemeProvider>
    </LayoutContainer>
  )
}

export default Layout
