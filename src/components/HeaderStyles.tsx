import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

export const HeaderContainer = styled.header<{ transparentHeader: boolean }>`
  color: ${({ theme }) => theme.colors.normal};
  padding: 0 ${({ theme }) => theme.spacing.pageSides};
  height: ${(props) => props.theme.spacing.headerHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;
  background-color: ${(props) => {
    return props.transparentHeader
      ? props.theme.colors.transparent
      : props.theme.colors.background
  }};
`

export const BurgerMenu = styled.div`
  @media ${({ theme }) => theme.screenSizes.desktop} {
    display: none !important;
  }
`

export const LogoLink = styled((props) => <Link {...props} />)`
  line-height: 0.9;
`

export const KojotenLogo = styled.img`
  width: 120px;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
`

export const PageControls = styled.div`
  display: flex;
`

export const LocaleSwitcher = styled.div`
  display: none;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    margin-left: 50px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
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
