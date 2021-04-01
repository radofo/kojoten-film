import React from "react"
import styled from "styled-components"

import { screenSizes } from "../../utils/mediaqueries"

const FilmDetailHeader = styled.h1`
  text-transform: uppercase;
  color: ${props =>
    props.isColoredHeader
      ? props.theme.colors.highlight
      : props.theme.colors.normal};
  line-height: 0.9;
  font-weight: normal;
  margin-bottom: 10px;
  @media ${screenSizes.desktop} {
    font-size: 3em;
  }
`
const FilmDetailDirector = styled.p`
  margin-bottom: 15px;
  color: ${props => props.theme.colors.normal};
  font-size: ${props => props.theme.fontSizes.regularText};
`
const FilmDetailGenres = styled.p`
  color: ${props => props.theme.colors.normal};

  font-size: ${props => props.theme.fontSizes.regularText};
  text-transform: uppercase;
`
const FilmDetailPlaytime = styled.p`
  color: ${props => props.theme.colors.normal};
  font-size: ${props => props.theme.fontSizes.regularText};
`
const FilmDetailStatus = styled.p`
  color: ${({ theme }) => theme.colors.highlight};
`

const FilmShortDescription = ({ details, isColoredHeader = false }) => {
  return (
    <>
      <FilmDetailHeader isColoredHeader={isColoredHeader}>
        {details.titel}
      </FilmDetailHeader>
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
      {details.filmstatus && (
        <FilmDetailStatus>{details.filmstatus.toUpperCase()}</FilmDetailStatus>
      )}
    </>
  )
}

export default FilmShortDescription
