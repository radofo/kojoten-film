import React, { useState, useEffect } from "react"
import styled from "styled-components"

const FilmDetailCoverContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  color: white;
  padding: var(--header-height) var(--padding-sides);
`

const FilmDetailHeader = styled.h1``
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

const FilmDetailCover = ({ details }) => {
  console.log("details: ", details)
  return (
    <FilmDetailCoverContainer>
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
      <FilmDetailPlaytime>{details.lngeInMinuten} Min.</FilmDetailPlaytime>
    </FilmDetailCoverContainer>
  )
}

export default FilmDetailCover
