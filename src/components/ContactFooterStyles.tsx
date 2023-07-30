import styled from "styled-components"
import { Link } from "gatsby"
import React from "react"

export const ContactFooterContainer = styled.div`
  padding: 50px ${({ theme }) => theme.spacing.pageSides} 20px;
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

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 2;
  grid-row: 3;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    grid-row-start: 1;
  }
`
export const LeftIconContainer = styled.div`
  grid-row: 1;
  grid-column: 1 / 4;
  justify-self: center;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    grid-column: 1;
    justify-self: start;
  }
`
export const RightIconContainer = styled.div`
  grid-row: 2;
  grid-column: 1 / 4;
  justify-self: center;

  @media ${({ theme }) => theme.screenSizes.desktop} {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
  }
`

export const BoringLinks = styled.div`
  display: none;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    & > :first-child {
      margin-right: 60px;
    }
    display: flex;
    margin-bottom: 30px;
  }
`

export const BoringLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.textDimmed};

  &:hover {
    color: ${(props) => props.theme.colors.highlight};
  }
`
