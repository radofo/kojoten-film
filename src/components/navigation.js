import React from "react"
import styled from "styled-components"

const NavigationContainer = styled.nav`
  display: none;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    display: flex;
    flex-direction: row;
  }
`

const Navigation = ({ children }) => {
  return <NavigationContainer>{children}</NavigationContainer>
}

export default Navigation
