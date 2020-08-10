import React, { useState, useEffect } from "react"
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
  @media ${screenSizes.desktop} {
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
  font-size: 20px;
  text-decoration: none;
  color: ${props => {
    return props.currentpath ? "var(--active-route)" : "var(--text-color)"
  }};
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

const MobileMenu = ({ isMenuOpen }) => {
  const [currentpath, setCurrentPath] = useState(null)

  useEffect(() => {
    setCurrentPath(window.location.pathname.split("/")[1])
  }, [])

  return (
    <MobileMenuContainer isMenuOpen={isMenuOpen}>
      <NavigationRow>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/news"
          activeClassName="active"
          currentpath={currentpath === "news" ? 1 : 0}
        >
          News
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/"
          currentpath={currentpath === "film" || currentpath === "" ? 1 : 0}
        >
          Film
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/commercial"
          currentpath={currentpath === "commercial" ? 1 : 0}
        >
          Commercial
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/team"
          currentpath={currentpath === "team" ? 1 : 0}
        >
          Team
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/contact"
          currentpath={currentpath === "contact" ? 1 : 0}
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
