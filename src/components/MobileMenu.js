import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"
import { Link } from "gatsby"
import SocialMediaIcons from "./reusable/SocialMediaIcons"

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

const NavigationItem = styled(props => <Link {...props} />)`
  font-size: ${({ theme }) => theme.fontSizes.regularText};
  text-decoration: none;
  color: ${({ theme, currentpath }) => {
    return currentpath ? theme.colors.highlight : theme.colors.normal
  }};
  margin-bottom: 20px;
`

const NaviationItemSmall = styled(props => <Link {...props} />)`
  font-size: ${({ theme }) => theme.fontSizes.smallText};
  text-decoration: none;
  color: ${({ theme, currentpath }) => {
    return currentpath ? theme.colors.highlight : theme.colors.normal
  }};
  margin-bottom: 20px;

  &:nth-last-child(3) {
    margin-top: 30px;
  }
`

const LocaleSwitcher = styled.div`
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
  color: ${props => props.buttonColor};
  padding: 0 2px;
  font-size: ${props => props.theme.fontSizes.xSmallText};
  display: flex;
  align-items: center;
  font-family: "DarkerGrotesque", sans-serif;
  &:hover {
    cursor: pointer;
    color: white;
  }
  &:focus {
    outline: none;
  }
`

const Dash = styled.span`
  font-size: 18px;
  color: ${props => props.theme.colors.textDimmed};
`

const MobileMenu = ({ isMenuOpen, locale, changeLocale }) => {
  const [currentpath, setCurrentPath] = useState(null)
  const t = {
    navigation: {
      commercial: {
        de: "Werbung",
        en: "Commercial",
      },
      news: {
        de: "News",
        en: "News",
      },
      film: {
        de: "Film",
        en: "Film",
      },
      contact: {
        de: "Kontakt",
        en: "Contact",
      },
      team: {
        de: "Team",
        en: "Team",
      },
      imprint: {
        de: "Impressum",
        en: "Imprint",
      },
      privacy: {
        de: "Datenschutz",
        en: "Privacy",
      },
    },
  }

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
        <NaviationItemSmall
          state={{ modal: false, locale: locale }}
          exact="true"
          to="/imprint"
          currentpath={currentpath === "imprint" ? 1 : 0}
        >
          {t.navigation.imprint[locale]}
        </NaviationItemSmall>
        <NaviationItemSmall
          state={{ modal: false, locale: locale }}
          exact="true"
          to="/privacy"
          currentpath={currentpath === "privacy" ? 1 : 0}
        >
          {t.navigation.privacy[locale]}
        </NaviationItemSmall>
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
      <SocialMediaIcons />
    </MobileMenuContainer>
  )
}

export default MobileMenu
