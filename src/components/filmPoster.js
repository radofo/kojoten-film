import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { createSrcSet } from "../utils/fetch"

const PosterImage = styled.img`
  height: 100%;
  height: ${props => props.posterHeight}px;
  padding-top: var(--header-height);
`

const FilmPoster = ({ film }) => {
  const [posterHeight, setPosterHeight] = useState(0)

  useEffect(() => {
    setPosterHeight(window.innerHeight)
    window.addEventListener("resize", handleResize)
  }, [])

  const handleResize = () => {
    setPosterHeight(window.innerHeight)
  }

  const poster = film.fields.poster.fields
  const [posterSrc, posterSrcSet] = createSrcSet(poster.file.url)
  return (
    <Link to={`/film/${film.fields.url}`} state={{ project: film }}>
      <PosterImage
        posterHeight={posterHeight}
        srcSet={posterSrcSet}
        src={posterSrc}
        alt={poster.title}
      />
    </Link>
  )
}

export default FilmPoster
