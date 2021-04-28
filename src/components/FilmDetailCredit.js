import React from "react"
import styled from "styled-components"

const FilmDetailCreditContainer = styled.div`
  margin-bottom: 15px;
`
const FilmDetailCreditHeader = styled.p`
  font-size: ${props => props.theme.fontSizes.xSmall};
  margin: 0 0 3px;
`
const FilmDetailCreditNames = styled.p`
  margin: 0;
  padding: 0;
`

const FilmDetailCredit = ({ category, credits }) => {
  return (
    <FilmDetailCreditContainer>
      <FilmDetailCreditHeader>{category}:</FilmDetailCreditHeader>
      <FilmDetailCreditNames>
        {credits &&
          credits.map((credit, index) => (
            <span key={index}>
              {credit}
              {index < credits.length - 1 ? ", " : ""}
            </span>
          ))}
      </FilmDetailCreditNames>
    </FilmDetailCreditContainer>
  )
}

export default FilmDetailCredit
