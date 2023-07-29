import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

export const MobileMenuContainer = styled.div<{ isMenuOpen: number }>`
  background: black;
  color: white;
  opacity: ${(props) => {
    return props.isMenuOpen ? "1" : "0"
  }};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${(props) => props.theme.spacing.headerHeight}
    ${({ theme }) => theme.spacing.pageSides} 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  transition: opacity 0.1s ease-out;
  z-index: ${(props) => {
    return props.isMenuOpen ? "9999" : "0"
  }};
  @media ${({ theme }) => theme.screenSizes.desktop} {
    display: none;
  }
`

export const NavigationRow = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0 25px;
`

export const NavigationItem = styled((props) => <Link {...props} />)`
  font-size: ${({ theme }) => theme.fontSizes.regular};
  text-decoration: none;
  color: ${({ theme, currentpath }) => {
    return currentpath ? theme.colors.highlight : theme.colors.normal
  }};
  margin-bottom: 20px;
`

export const NaviationItemSmall = styled((props) => <Link {...props} />)`
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-decoration: none;
  color: ${({ theme, currentpath }) => {
    return currentpath ? theme.colors.highlight : theme.colors.normal
  }};
  margin-bottom: 20px;

  &:nth-last-child(3) {
    margin-top: 30px;
  }
`

export const LocaleSwitcher = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    display: none;
  }
`

export const LocaleButton = styled.button<{ buttonColor: string }>`
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0);
  color: ${(props) => props.buttonColor};
  padding: 0 2px;
  font-size: ${(props) => props.theme.fontSizes.xSmall};
  display: flex;
  align-items: center;
  font-family: "DarkerGrotesque", sans-serif;
  &:hover {
    cursor: pointer;
    color: white;
  }
  &:focus {
    outline: none;
  }
`

export const Dash = styled.span`
  font-size: 18px;
  color: ${(props) => props.theme.colors.textDimmed};
`
