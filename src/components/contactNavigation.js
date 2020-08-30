import React from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"

const Navigation = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${screenSizes.desktop} {
    margin: 0 100px 0 0;
    align-items: flex-start;
  }
`

const NavigationItem = styled.li`
  color: ${props =>
    props.selected ? "var(--highlight-color)" : "var(--text-color)"};

  &:not(:last-child) {
    margin-bottom: 30px;
  }
  text-transform: uppercase;
  cursor: pointer;
`

const ContactNavigation = ({ handleTabChange, activeTab, locale }) => {
  const t = {
    contact: {
      imprint: {
        de: "Impressum",
        en: "Imprint",
      },
      privacy: {
        de: "Datenschutz",
        en: "Privacy",
      },
      address: {
        de: "Adresse",
        en: "Address",
      },
    },
  }
  return (
    <Navigation>
      <NavigationItem
        onClick={() => handleTabChange(0)}
        selected={activeTab === 0}
      >
        {t.contact.address[locale]}
      </NavigationItem>
      <NavigationItem
        onClick={() => handleTabChange(1)}
        selected={activeTab === 1}
      >
        {t.contact.imprint[locale]}
      </NavigationItem>
      <NavigationItem
        onClick={() => handleTabChange(2)}
        selected={activeTab === 2}
      >
        {t.contact.privacy[locale]}
      </NavigationItem>
    </Navigation>
  )
}

export default ContactNavigation
