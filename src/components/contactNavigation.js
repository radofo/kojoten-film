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
  @media ${screenSizes.tablet} {
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

const ContactNavigation = ({ handleTabChange, activeTab }) => {
  return (
    <Navigation>
      <NavigationItem
        onClick={() => handleTabChange(0)}
        selected={activeTab === 0}
      >
        Adresse
      </NavigationItem>
      <NavigationItem
        onClick={() => handleTabChange(1)}
        selected={activeTab === 1}
      >
        Impressum
      </NavigationItem>
      <NavigationItem
        onClick={() => handleTabChange(2)}
        selected={activeTab === 2}
      >
        Datenschutz
      </NavigationItem>
    </Navigation>
  )
}

export default ContactNavigation
