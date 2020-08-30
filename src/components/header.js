import React from "react"
import styled from "styled-components"
import kojotenlogo from "../media/kojoten_logo.svg"
import { screenSizes } from "../utils/mediaqueries"
import Navigation from "./navigation"
import NavItem from "./navItem"
import { Link } from "gatsby"

// ================ Styled Components ================
const HeaderContainer = styled.header`
  color: var(--text-color);
  padding: 0 var(--padding-sides);
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;
  background-color: ${props => {
    return props.transparentHeader
      ? "var(--header-bgcolor-transparent)"
      : "var(--header-bgcolor)"
  }};
`

const BurgerMenu = styled.div`
  @media ${screenSizes.desktop} {
    display: none;
  }
`

const BackButton = styled.i`
  color: var(--text-color);
  &:hover {
    cursor: pointer;
  }
`

const KojotenLogo = styled.img`
  width: 120px;
  &:hover {
    cursor: pointer;
  }
`

const PageControls = styled.div`
  display: flex;
`

const LocaleSwitcher = styled.div`
  display: none;
  @media ${screenSizes.desktop} {
    margin-left: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
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

// ================ Header React Component ================
const Header = ({
  isMenuOpen,
  handleClick,
  transparentHeader,
  backButton,
  locale,
  changeLocale,
}) => {
  const headerImage = backButton ? (
    <Link to="/">
      <BackButton className="fa fa-arrow-left fa-2x" alt="Back"></BackButton>
    </Link>
  ) : (
    <Link to="/" state={{ modal: false, locale: locale }}>
      <KojotenLogo src={kojotenlogo} alt="Kojoten Film" />
    </Link>
  )
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
    },
  }

  const setLocale = language => {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("kojotenLanguage", language)
    }
    changeLocale(language)
  }
  return (
    <HeaderContainer transparentHeader={transparentHeader}>
      {headerImage}
      <PageControls>
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
        <Navigation>
          <NavItem locale={locale} link="/news">
            {t.navigation.news[locale]}
          </NavItem>
          <NavItem locale={locale} link="/">
            {t.navigation.film[locale]}
          </NavItem>
          <NavItem locale={locale} link="/commercial">
            {t.navigation.commercial[locale]}
          </NavItem>
          <NavItem locale={locale} link="/team">
            {t.navigation.team[locale]}
          </NavItem>
          <NavItem locale={locale} link="/contact">
            {t.navigation.contact[locale]}
          </NavItem>
        </Navigation>
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
      </PageControls>
    </HeaderContainer>
  )
}

export default Header
