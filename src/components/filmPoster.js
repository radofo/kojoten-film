import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { createSrcSet } from "../utils/fetch"
import t from "../data/translations.json"

const PosterImage = styled.img`
  height: 100%;
  height: ${props => props.posterHeight}px;
  padding-top: var(--header-height);
`

const PosterContainer = styled(props => <Link {...props} />)`
  display: block;
  position: relative;
`

const ComingSoon = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 15px 0;
  position: absolute;
  top: 75%;
  left: 0;
  display: grid;
  place-items: center;
  color: var(--highlight-color);
  text-transform: uppercase;
`
const FilmPoster = ({ film, locale }) => {
  const [posterHeight, setPosterHeight] = useState(0)

  useEffect(() => {
    setPosterHeight(window.innerHeight)
    window.addEventListener("resize", handleResize)
  }, [])

  const handleResize = () => {
    setPosterHeight(window.innerHeight)
  }

  let poster
  let posterSrc, posterSrcSet

  if (film.fields.poster) {
    poster = film.fields.poster.fields
    posterSrc = createSrcSet(poster.file.url)[0]
    posterSrcSet = createSrcSet(poster.file.url)[1]
  }
  return (
    <PosterContainer
      to={`/film/${film.fields.url}`}
      state={{ project: film, locale: locale }}
    >
      <PosterImage
        posterHeight={posterHeight}
        srcSet={posterSrcSet}
        src={posterSrc}
        alt={poster && poster.title}
      />
      {film.fields.inEntwicklung && (
        <ComingSoon>{t.film.comingsoon[locale]}</ComingSoon>
      )}
    </PosterContainer>
  )
}

export default FilmPoster
