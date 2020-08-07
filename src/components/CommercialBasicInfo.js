import React from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"

const CommercialBasicInfoContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 50px;
  padding: 0 calc(var(--padding-sides) + 20px);
  color: white;
`

const CommercialDetailHeader = styled.h1`
  @media ${screenSizes.desktop} {
    font-size: 2.8em;
  }
`
const CommercialMoreDetails = styled.p`
  margin-bottom: 15px;
  font-size: 14px;
`

const CommercialBasicInfo = ({ details }) => {
  return (
    <CommercialBasicInfoContainer>
      <CommercialDetailHeader>{details.name}</CommercialDetailHeader>
      <CommercialMoreDetails>
        Regisseur | {details.regisseur} <br />
        Kunde | {details.kunde} <br />
        Agentur | {details.agentur}
      </CommercialMoreDetails>
    </CommercialBasicInfoContainer>
  )
}

export default CommercialBasicInfo
