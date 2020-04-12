import React, { useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import logo from "../media/kojoten_logo.svg"

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
const Header = styled.header`
  background-color: ${props => {
    return props.transparent
      ? "var(--header-bgcolor-transparent)"
      : "var(--header-bgcolor)"
  }};
  color: var(--text-color);
  padding: 0 var(--padding-sides);
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
`
const BurgerMenu = styled.div``
const Body = styled.main`
  margin-top: ${props => {
    return props.transparent ? 0 : "var(--header-height)"
  }};
`

// ============== React Component ==============
const Layout = ({ children, transparent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <CSSVariables>
      <GlobalStyle />
      <Header transparent={transparent}>
        <img src={logo} alt="Kojoten Film" />
        <BurgerMenu
          className={`hamburger hamburger--squeeze ${
            isMenuOpen ? "is-active" : ""
          }`}
          onClick={handleClick}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </BurgerMenu>
      </Header>
      <Body transparent={transparent}>{children}</Body>
    </CSSVariables>
  )
}

export default Layout
