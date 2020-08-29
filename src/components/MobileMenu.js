import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"
import { Link } from "gatsby"
import t from "../data/translations.json"

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

const LocaleSwitcher = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${screenSizes.desktop} {
    display: none;
  }
`

const LocaleButton = styled.button`
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0);
  font-size: 14px;
  color: ${props => props.buttonColor};
  padding: 0 2px;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    color: white;
  }
  &:focus {
    outline: none;
  }
`

const Dash = styled.span`
  font-size: 12px;
`

const MobileMenu = ({ isMenuOpen, locale, changeLocale }) => {
  const [currentpath, setCurrentPath] = useState(null)

  useEffect(() => {
    setCurrentPath(window.location.pathname.split("/")[1])
  }, [])

  const setLocale = language => {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("kojotenLanguage", language)
    }
    changeLocale(language)
  }

  return (
    <MobileMenuContainer isMenuOpen={isMenuOpen ? 1 : 0}>
      <NavigationRow>
        <NavigationItem
          state={{ modal: false, locale: locale }}
          exact="true"
          to="/news"
          activeClassName="active"
          currentpath={currentpath === "news" ? 1 : 0}
        >
          {t.navigation.news[locale]}
        </NavigationItem>
        <NavigationItem
          state={{ modal: false, locale: locale }}
          exact="true"
          to="/"
          currentpath={currentpath === "film" || currentpath === "" ? 1 : 0}
        >
          {t.navigation.film[locale]}
        </NavigationItem>
        <NavigationItem
          state={{ modal: false, locale: locale }}
          exact="true"
          to="/commercial"
          currentpath={currentpath === "commercial" ? 1 : 0}
        >
          {t.navigation.commercial[locale]}
        </NavigationItem>
        <NavigationItem
          state={{ modal: false, locale: locale }}
          exact="true"
          to="/team"
          currentpath={currentpath === "team" ? 1 : 0}
        >
          {t.navigation.team[locale]}
        </NavigationItem>
        <NavigationItem
          state={{ modal: false, locale: locale }}
          exact="true"
          to="/contact"
          currentpath={currentpath === "contact" ? 1 : 0}
        >
          {t.navigation.contact[locale]}
        </NavigationItem>
        <LocaleSwitcher>
          <LocaleButton
            onClick={() => setLocale("de")}
            buttonColor={locale === "en" ? "grey" : "white"}
          >
            DE
          </LocaleButton>
          <Dash>|</Dash>
          <LocaleButton
            onClick={() => setLocale("en")}
            buttonColor={locale === "en" ? "white" : "grey"}
          >
            EN
          </LocaleButton>
        </LocaleSwitcher>
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
