import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { createSrcSet } from "../utils/fetch"

const PosterImage = styled.img`
  height: 100%;
  height: ${(props) => props.posterHeight}px;
  padding-top: ${(props) => props.theme.spacing.headerHeight};
`

const PosterContainer = styled((props) => <Link {...props} />)`
  display: block;
  position: relative;
`

const FilmPoster = ({ film, height, locale }) => {
  let poster
  let posterSrc, posterSrcSet

  if (film.fields.poster) {
    poster = film.fields.poster.fields
    const [src, srcSet] = createSrcSet({ src: poster.file.url, size: "900" })
    posterSrc = src
    posterSrcSet = srcSet
  }
  return (
    <PosterContainer
      to={`/film/${film.fields.url}`}
      state={{ project: film, locale: locale }}
    >
      <PosterImage
        posterHeight={height}
        srcSet={posterSrcSet}
        src={posterSrc}
        alt={poster && poster.title}
      />
    </PosterContainer>
  )
}

export default FilmPoster
