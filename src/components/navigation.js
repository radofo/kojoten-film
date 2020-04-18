import React from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"

const NavigationContainer = styled.nav`
  display: none;
  @media ${screenSizes.tablet} {
    display: flex;
    flex-direction: row;
  }
`

const Navigation = ({ children }) => {
  return <NavigationContainer>{children}</NavigationContainer>
}

export default Navigation
