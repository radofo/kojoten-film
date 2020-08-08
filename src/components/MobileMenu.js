import React from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"
import { Link } from "gatsby"

const MobileMenuContainer = styled.div`
  background: black;
  color: white;
  opacity: ${props => {
    return props.isMenuOpen ? "1" : "0"
  }};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--header-height) var(--padding-sides) 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  transition: opacity 0.1s ease-out;
  z-index: ${props => {
    return props.isMenuOpen ? "9999" : "0"
  }};
  @media ${screenSizes.tablet} {
    display: none;
  }
`

const NavigationRow = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0 25px;
`

const SocialRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 20px 30px;
`

const SocialIcon = styled.i`
  color: white;
  font-size: 20px;
  &:hover {
    color: var(--highlight-color);
    cursor: pointer;
  }
`

const NavigationItem = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: var(--text-color);
  font-size: 20px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  &.active {
    color: var(--active-route);
  }
`

const MobileMenu = ({ isMenuOpen }) => {
  return (
    <MobileMenuContainer isMenuOpen={isMenuOpen}>
      <NavigationRow>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/news"
          activeClassName="active"
        >
          News
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/"
          activeClassName="active"
        >
          Film
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/commercial"
          activeClassName="active"
        >
          Commercial
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/team"
          activeClassName="active"
        >
          Team
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/contact"
          activeClassName="active"
        >
          Contact
        </NavigationItem>
      </NavigationRow>
      <SocialRow>
        <SocialIcon className="fab fa-instagram"></SocialIcon>
        <SocialIcon className="fab fa-facebook-f"></SocialIcon>
        <SocialIcon className="fab fa-vimeo-v"></SocialIcon>
        <SocialIcon className="far fa-envelope"></SocialIcon>
      </SocialRow>
    </MobileMenuContainer>
  )
}

export default MobileMenu
