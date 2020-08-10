import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { createSrcSet } from "../utils/fetch"

const PosterImage = styled.img`
  height: 100%;
  padding-top: var(--header-height);
`

const FilmPoster = ({ film }) => {
  const poster = film.fields.poster.fields
  const [posterSrc, posterSrcSet] = createSrcSet(poster.file.url)
  return (
    <Link to={`/film/${film.fields.url}`} state={{ project: film }}>
      <PosterImage srcSet={posterSrcSet} src={posterSrc} alt={poster.title} />
    </Link>
  )
}

export default FilmPoster
