import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { screenSizes } from "../../utils/mediaqueries"
import SocialMediaIcons from "../reusable/SocialMediaIcons"

// Level 1
const ContactFooterContainer = styled.div`
  padding: 50px 0 20px;
  flex: 0;
  display: grid;
  row-gap: 40px;
  justify-items: center;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr 1fr;

  @media ${screenSizes.desktop} {
    grid-template-rows: 1fr;
  }
`

// Level 2
const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column-start: 2;
  grid-row-start: 2;
  @media ${screenSizes.desktop} {
    grid-row-start: 1;
  }
`

const ProduzentenAllianz = styled.img`
  width: 100px;
  grid-row-start: 1;
  grid-column-start: 2;
  @media ${screenSizes.desktop} {
    width: 120px;
    justify-self: end;
    grid-column-start: 3;
  }
`

const BoringLinks = styled.div`
  display: none;
  @media ${screenSizes.desktop} {
    & > :first-child {
      margin-right: 60px;
    }
    display: flex;
    margin-bottom: 30px;
  }
`

const BoringLink = styled(props => <Link {...props} />)`
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.smallText};
  color: ${props => props.theme.colors.textDimmed};
  &:hover {
    color: ${props => props.theme.colors.highlight};
  }
`

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
      <Links>
        <BoringLinks>
          <BoringLink to="/imprint">{t.imprint[locale]}</BoringLink>
          <BoringLink to="/privacy">{t.privacy[locale]}</BoringLink>
        </BoringLinks>
        <SocialMediaIcons />
      </Links>
      <ProduzentenAllianz
        src={contactInfos?.produzentenAllianzLogo?.fields?.file?.url}
      ></ProduzentenAllianz>
    </ContactFooterContainer>
  )
}

export default ContactFooter
