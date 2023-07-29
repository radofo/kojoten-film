import React, { useContext } from "react"
import { LocaleContext } from "../context/LocaleContext"
import { Film } from "../contentful/film"
import {
  FilmDetailDirector,
  FilmDetailGenres,
  FilmDetailHeader,
  FilmDetailPlaytime,
  FilmDetailStatus,
} from "./FilmShortDescriptionStyles"

type FilmShortDescriptionProps = {
  details: Film
  isColoredHeader?: boolean
}

const FilmShortDescription = ({
  details,
  isColoredHeader = false,
}: FilmShortDescriptionProps) => {
  const { locale } = useContext(LocaleContext)

  return (
    <>
      <FilmDetailHeader isColoredHeader={isColoredHeader}>
        {details.titel[locale]}
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
          details.genres[locale].map((genre, index) => {
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
        <FilmDetailStatus>
          {details.filmstatus[locale]?.toUpperCase()}
        </FilmDetailStatus>
      )}
    </>
  )
}

export default FilmShortDescription
