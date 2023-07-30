import React, { useContext } from "react"
// @ts-ignore
import kojotenlogo from "../media/kojoten_logo_new.png"
import Navigation from "./navigation"
import NavItem from "./navItem"
import { t } from "../i18n/navigation"
import { Link } from "gatsby"
import { BackButton } from "../styles/styled-components"
import {
  BurgerMenu,
  HeaderContainer,
  Dash,
  KojotenLogo,
  LocaleButton,
  LocaleSwitcher,
  LogoLink,
  PageControls,
} from "./HeaderStyles"
import { LocaleContext } from "../context/LocaleContext"

const Header = ({ isMenuOpen, handleClick, transparentHeader, backButton }) => {
  const { locale, updateLocale } = useContext(LocaleContext)

  const headerImage = backButton ? (
    <Link to="/" state={{ modal: false }}>
      <BackButton size={36} />
    </Link>
  ) : (
    <LogoLink to="/" state={{ modal: false }}>
      <KojotenLogo src={kojotenlogo} alt="Kojoten Film" />
    </LogoLink>
  )

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
          <NavItem locale={locale} link="/about-us">
            {t.navigation.contact[locale]}
          </NavItem>
        </Navigation>
        <LocaleSwitcher>
          <LocaleButton
            onClick={() => updateLocale("de")}
            buttonColor={locale === "en" ? "grey" : "white"}
          >
            DE
          </LocaleButton>
          <Dash>|</Dash>
          <LocaleButton
            onClick={() => updateLocale("en")}
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
