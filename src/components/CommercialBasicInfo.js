import React from "react"
import styled from "styled-components"

const CommercialBasicInfoContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 10px;
  padding: 0 calc(var(--padding-sides) + 10px);
  color: white;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    bottom: 60px;
  }
`

const CommercialDetailHeader = styled.h1`
  line-height: 0.9;
  margin-bottom: 5px;
  text-transform: uppercase;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    font-size: 3em;
  }
`
const CommercialMoreDetails = styled.p`
  margin-bottom: 15px;
  font-size: ${props => props.theme.fontSizes.xxLarge};
`

const CommercialBasicInfo = ({ details, locale }) => {
  const t = {
    commercial: {
      regisseur: {
        de: "Regisseur*in",
        en: "Director",
      },
      kunde: {
        de: "Kunde",
        en: "Client",
      },
    },
  }
  return (
    <CommercialBasicInfoContainer>
      <CommercialDetailHeader>{details.kunde}</CommercialDetailHeader>
      <CommercialMoreDetails>{details.name}</CommercialMoreDetails>
    </CommercialBasicInfoContainer>
  )
}

export default CommercialBasicInfo
