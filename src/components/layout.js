// Libraries
import React, { useState, useEffect } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Helmet } from "react-helmet"
import favicon from "../media/favicon.svg"

// Children
import Header from "./header"
import MobileMenu from "./MobileMenu"
// Utils
import { headerHeight } from "../utils/window"

// ============== Global Styles & Variables ==============
const CSSVariables = styled.div`
  --padding-sides: 3%;
  --text-color: #fff;
  --header-bgcolor: #000;
  --header-bgcolor-transparent: rgba(0, 0, 0, 0);
  --header-height: ${headerHeight}px;
  --slider-speed-factor: 160;
  --active-route: #ffd600;
  --highlight-color: #ffd600;
  --default-font-size: 16px;
`
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body, html {
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
    Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: bold;
    background-color: black;
  }
`

// ============== Styled Components ==============

const Body = styled.main``

// ============== Layout Component ==============
const Layout = ({ children, transparentHeader, backButton }) => {
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
    <CSSVariables>
      <Helmet>
        <link rel="icon" href={favicon} />
        <link href="/fontawesome/css/all.css" rel="stylesheet"></link>
        <title>Kojoten Filmproduktion</title>
      </Helmet>
      <GlobalStyle />
      <Body isMenuOpen={isMenuOpen} transparentHeader={transparentHeader}>
        {children}
      </Body>
      <Header
        handleClick={handleClick}
        isMenuOpen={isMenuOpen}
        transparentHeader={transparentHeader}
        backButton={backButton}
      />
      <MobileMenu isMenuOpen={isMenuOpen} />
    </CSSVariables>
  )
}

export default Layout
