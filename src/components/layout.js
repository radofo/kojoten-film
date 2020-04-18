// Libraries
import React, { useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
// Children
import Header from "./header"

// ============== Global Styles & Variables ==============
const CSSVariables = styled.div`
  --padding-sides: 3%;
  --text-color: #fff;
  --header-bgcolor: #000;
  --header-bgcolor-transparent: rgba(0, 0, 0, 0);
  --header-height: 70px;
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
    background-color: #eee;
  }
`

// ============== Styled Components ==============

const Body = styled.main`
  margin-top: ${props => {
    return props.transparent ? 0 : "var(--header-height)"
  }};
`

// ============== Layout Component ==============
const Layout = ({ children, transparentHeader }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <CSSVariables>
      <GlobalStyle />
      <Header
        handleClick={handleClick}
        isMenuOpen={isMenuOpen}
        transparentHeader={transparentHeader}
      />
      <Body transparentHeader={transparentHeader}>{children}</Body>
    </CSSVariables>
  )
}

export default Layout
