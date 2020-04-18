import React from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"

const NavigationContainer = styled.nav`
  display: none;
  @media ${screenSizes.tablet} {
    display: initial;
  }
`

const NavigationList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
`

const Navigation = ({ children }) => {
  return (
    <NavigationContainer>
      <NavigationList>{children}</NavigationList>
    </NavigationContainer>
  )
}

export default Navigation
