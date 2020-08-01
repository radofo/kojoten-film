import React from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"

const FilmBasicInfoContainer = styled.div`
  color: ${props => {
    return props.highlight ? "var(--highlight-color)" : "var(--text-color)"
  }};
`

const FilmDetailHeader = styled.h1`
  @media ${screenSizes.desktop} {
    font-size: 2.8em;
  }
`
const FilmDetailDirector = styled.p`
  margin-bottom: 15px;
  font-size: 14px;
`
const FilmDetailGenres = styled.p`
  font-size: 14px;
  text-transform: uppercase;
`
const FilmDetailPlaytime = styled.p`
  font-size: 14px;
`

const FilmBasicInfo = ({ details, highlight }) => {
  return (
    <FilmBasicInfoContainer highlight={highlight}>
      <FilmDetailHeader>{details.titel}</FilmDetailHeader>
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

export default FilmBasicInfo
