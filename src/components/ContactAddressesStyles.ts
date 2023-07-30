import styled from "styled-components"

export const ContactAddressesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  z-index: 9;
  padding-top: ${(props) => props.theme.spacing.headerHeight};
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-inline: 100px;
`

export const ContactAddressContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
  flex-direction: column;
  flex-basis: 33%;
  min-width: 350px;
  align-items: center;
`

export const ContactAddressHeader = styled.h1`
  color: ${(props) => props.theme.colors.highlight};
  font-weight: 300;
  text-transform: uppercase;
  font-size: 36px;
  line-height: 36px;
`

export const ContactAddressLine = styled.p`
  color: ${(props) => props.theme.colors.textDimmed};
  font-size: ${(props) => props.theme.fontSizes.small};
`

export const ContactAddressLineLink = styled.a`
  color: ${(props) => props.theme.colors.textDimmed};
  font-size: ${(props) => props.theme.fontSizes.small};
  text-decoration: underline;
  &:hover {
    color: ${(props) => props.theme.colors.highlight};
  }
`
