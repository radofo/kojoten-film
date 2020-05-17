import React from "react"
import styled from "styled-components"
import kojotenlogo from "../media/kojoten_logo.svg"
import { screenSizes } from "../utils/mediaqueries"
import Navigation from "./navigation"
import NavItem from "./navItem"

// ================ Styled Components ================
const HeaderContainer = styled.header`
  background-color: ${props => {
    return props.transparentHeader
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
  z-index: 99;
`

const BurgerMenu = styled.div`
  @media ${screenSizes.tablet} {
    display: none;
  }
`

// ================ Header React Component ================
const Header = ({ isMenuOpen, handleClick, transparentHeader }) => {
  return (
    <HeaderContainer transparentHeader={transparentHeader}>
      <img src={kojotenlogo} alt="Kojoten Film" />
      <BurgerMenu
        className={`hamburger hamburger--squeeze ${
          isMenuOpen ? "is-active" : ""
        }`}
        onClick={handleClick}
        screenSizes={screenSizes}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </BurgerMenu>
      <Navigation>
        <NavItem link="/news">News</NavItem>
        <NavItem link="/">Film</NavItem>
        <NavItem link="/commercial">Commercial</NavItem>
        <NavItem link="/team">Team</NavItem>
        <NavItem link="/contact">Contact</NavItem>
      </Navigation>
    </HeaderContainer>
  )
}

export default Header
