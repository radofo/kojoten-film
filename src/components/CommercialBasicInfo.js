import React from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"
import t from "../data/translations.json"

const CommercialBasicInfoContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 10px;
  padding: 0 calc(var(--padding-sides) + 10px);
  color: white;
  @media ${screenSizes.desktop} {
    bottom: 50px;
  }
`

const CommercialDetailHeader = styled.h1`
  @media ${screenSizes.desktop} {
    font-size: 3em;
  }
`
const CommercialMoreDetails = styled.p`
  margin-bottom: 15px;
  font-size: 14px;
`

const CommercialBasicInfo = ({ details, locale }) => {
  return (
    <CommercialBasicInfoContainer>
      <CommercialDetailHeader>{details.name}</CommercialDetailHeader>
      <CommercialMoreDetails>
        {details.regisseur &&
          `${t.commercial.regisseur[locale]} | ${details.regisseur}`}{" "}
        <br />
        {details.kunde && `${t.commercial.kunde[locale]} | ${details.kunde}`}
      </CommercialMoreDetails>
    </CommercialBasicInfoContainer>
  )
}

export default CommercialBasicInfo
