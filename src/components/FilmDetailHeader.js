import React from "react"
import styled from "styled-components"

const FilmBasicInfoContainer = styled.div``

const FilmDetailHeading = styled.h1`
  color: ${({ theme }) => theme.colors.highlight};
  line-height: 0.9;
  margin-bottom: 5px;
  font-weight: normal;
  text-transform: uppercase;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    font-size: 3em;
  }
`
const FilmDetailDirector = styled.p`
  margin-bottom: 15px;
  font-size: ${(props) => props.theme.fontSizes.regular};
`
const FilmDetailGenres = styled.p`
  font-size: ${(props) => props.theme.fontSizes.regular};
  text-transform: uppercase;
`
const FilmDetailPlaytime = styled.p`
  font-size: ${(props) => props.theme.fontSizes.regular};
`

const FilmDetailHeader = ({ details, infosOpen }) => {
  return (
    <FilmBasicInfoContainer infosOpen={infosOpen}>
      <FilmDetailHeading>{details.titel}</FilmDetailHeading>
      <FilmDetailDirector>
        {details.director &&
          details.director.map((director, index) => {
            return (
              <span key={index}>
                {index > 0 ? ", " : ""}
                {director}
              </span>
            )
          })}
      </FilmDetailDirector>
      <FilmDetailGenres>
        {details.genres &&
          details.genres.map((genre, index) => {
            return (
              <span key={index}>
                {index > 0 ? ", " : ""}
                {genre}
              </span>
            )
          })}
      </FilmDetailGenres>
      <FilmDetailPlaytime>
        {details.lngeInMinuten ? `${details.lngeInMinuten} MIN.` : ""}
      </FilmDetailPlaytime>
    </FilmBasicInfoContainer>
  )
}

export default FilmDetailHeader
