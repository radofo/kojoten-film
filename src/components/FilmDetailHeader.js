import React from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"

const FilmBasicInfoContainer = styled.div``

const FilmDetailHeading = styled.h1`
  color: var(--highlight-color);
  line-height: 0.9;
  font-weight: normal;
  text-transform: uppercase;
  @media ${screenSizes.desktop} {
    margin-bottom: 20px;
    font-size: 3em;
  }
`
const FilmDetailDirector = styled.p`
  margin-bottom: 15px;
  font-size: ${(props) => props.theme.fontSizes.regularText};
`
const FilmDetailGenres = styled.p`
  font-size: ${(props) => props.theme.fontSizes.regularText};
  text-transform: uppercase;
`
const FilmDetailPlaytime = styled.p`
  font-size: ${(props) => props.theme.fontSizes.regularText};
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
        {details.lngeInMinuten ? `${details.lngeInMinuten} Min.` : ""}
      </FilmDetailPlaytime>
    </FilmBasicInfoContainer>
  )
}

export default FilmDetailHeader
