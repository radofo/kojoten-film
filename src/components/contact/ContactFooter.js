import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { IconRow } from "../IconRow"
import SocialMediaIcons from "../reusable/SocialMediaIcons"

// Level 1
const ContactFooterContainer = styled.div`
  padding: 50px 0 20px;
  flex: 0;
  display: grid;
  gap: 40px 20px;
  justify-items: center;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: repeat(3, auto);
  @media ${({ theme }) => theme.screenSizes.desktop} {
    grid-template-rows: 1fr;
  }
`

// Level 2
const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 2;
  grid-row: 3;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    grid-row-start: 1;
  }
`
const LeftIconContainer = styled.div`
  grid-row: 1;
  grid-column: 1 / 4;
  justify-self: center;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    grid-column: 1;
    justify-self: start;
  }
`
const RightIconContainer = styled.div`
  grid-row: 2;
  grid-column: 1 / 4;
  justify-self: center;

  @media ${({ theme }) => theme.screenSizes.desktop} {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
  }
`

const BoringLinks = styled.div`
  display: none;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    & > :first-child {
      margin-right: 60px;
    }
    display: flex;
    margin-bottom: 30px;
  }
`

const BoringLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.textDimmed};

  &:hover {
    color: ${(props) => props.theme.colors.highlight};
  }
`

const ICON_WIDTH = "75px"
const ICON_HEIGHT = "40px"

const ContactFooter = ({ contactInfos, locale }) => {
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
  return (
    <ContactFooterContainer>
      <LeftIconContainer>
        <IconRow
          iconWidth={ICON_WIDTH}
          iconHeight={ICON_HEIGHT}
          icons={contactInfos?.logosLinksUnten}
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
          icons={contactInfos?.logosRechtsUnten}
        />
      </RightIconContainer>
    </ContactFooterContainer>
  )
}

export default ContactFooter
