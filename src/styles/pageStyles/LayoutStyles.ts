import styled, { createGlobalStyle } from "styled-components"
import { StandardTheme } from "../theme"

export const GlobalStyle = createGlobalStyle<{ theme: StandardTheme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body, html {
    font-family: "DarkerGrotesque", sans-serif;
    font-size: ${(props) => props.theme.fontSizes.regular};
    background-color: black;
  }
  img:not([src]) {
    display: none;
  }
`

export const LayoutContainer = styled.div``
export const Body = styled.main``
