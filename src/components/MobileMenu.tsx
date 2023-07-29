import React, { useState, useEffect, useContext } from "react"
import SocialMediaIcons from "./reusable/SocialMediaIcons"
import {
  LocaleButton,
  LocaleSwitcher,
  MobileMenuContainer,
  NaviationItemSmall,
  NavigationItem,
  NavigationRow,
  Dash,
} from "./MobileMenuStyles"
import { LocaleContext } from "../context/LocaleContext"
import { t } from "../i18n/navigation"

// TODO: unify with regular menu
const MobileMenu = ({ isMenuOpen }) => {
  const { locale, updateLocale } = useContext(LocaleContext)
  const [currentpath, setCurrentPath] = useState<string | null>(null)

  useEffect(() => {
    setCurrentPath(window?.location?.pathname?.split("/")?.[1] ?? null)
  }, [])

  return (
    <MobileMenuContainer isMenuOpen={isMenuOpen ? 1 : 0}>
      <NavigationRow>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/news"
          activeClassName="active"
          currentpath={currentpath === "news" ? 1 : 0}
        >
          {t.navigation.news[locale]}
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/"
          currentpath={currentpath === "film" || currentpath === "" ? 1 : 0}
        >
          {t.navigation.film[locale]}
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/commercial"
          currentpath={currentpath === "commercial" ? 1 : 0}
        >
          {t.navigation.commercial[locale]}
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/team"
          currentpath={currentpath === "team" ? 1 : 0}
        >
          {t.navigation.team[locale]}
        </NavigationItem>
        <NavigationItem
          state={{ modal: false }}
          exact="true"
          to="/about-us"
          currentpath={currentpath === "contact" ? 1 : 0}
        >
          {t.navigation.contact[locale]}
        </NavigationItem>
        <NaviationItemSmall
          state={{ modal: false }}
          exact="true"
          to="/imprint"
          currentpath={currentpath === "imprint" ? 1 : 0}
        >
          {t.navigation.imprint[locale]}
        </NaviationItemSmall>
        <NaviationItemSmall
          state={{ modal: false }}
          exact="true"
          to="/privacy"
          currentpath={currentpath === "privacy" ? 1 : 0}
        >
          {t.navigation.privacy[locale]}
        </NaviationItemSmall>
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
      </NavigationRow>
      <SocialMediaIcons />
    </MobileMenuContainer>
  )
}

export default MobileMenu
