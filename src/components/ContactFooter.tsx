import React, { useContext } from "react"
import { IconRow } from "./IconRow"
import SocialMediaIcons from "./reusable/SocialMediaIcons"
import { AboutUsPage } from "../contentful/about-us"
import { LocaleContext } from "../context/LocaleContext"
import {
  BoringLink,
  BoringLinks,
  ContactFooterContainer,
  LeftIconContainer,
  Links,
  RightIconContainer,
} from "./ContactFooterStyles"

const ICON_WIDTH = "75px"
const ICON_HEIGHT = "40px"

const t = {
  imprint: {
    de: "Impressum",
    en: "Imprint",
  },
  privacy: {
    de: "Datenschutz",
    en: "Privacy",
  },
}

type ContactFooterProps = {
  aboutUsPage?: AboutUsPage
}

const ContactFooter = ({ aboutUsPage }: ContactFooterProps) => {
  const { locale } = useContext(LocaleContext)

  return (
    <ContactFooterContainer>
      <LeftIconContainer>
        <IconRow
          iconWidth={ICON_WIDTH}
          iconHeight={ICON_HEIGHT}
          icons={aboutUsPage?.logosLinksUnten ?? []}
        />
      </LeftIconContainer>
      <Links>
        <BoringLinks>
          <BoringLink to="/imprint">{t.imprint[locale]}</BoringLink>
          <BoringLink to="/privacy">{t.privacy[locale]}</BoringLink>
        </BoringLinks>
        <SocialMediaIcons />
      </Links>
      <RightIconContainer>
        <IconRow
          iconWidth={ICON_WIDTH}
          iconHeight={ICON_HEIGHT}
          icons={aboutUsPage?.logosRechtsUnten ?? []}
        />
      </RightIconContainer>
    </ContactFooterContainer>
  )
}

export default ContactFooter
