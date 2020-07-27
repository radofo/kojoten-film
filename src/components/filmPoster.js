import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const PosterImage = styled.img`
  height: 100vh;
  height: ${props => props.posterHeight}px;
  padding-top: var(--header-height);
`

const FilmPoster = ({ project, posterHeight }) => {
  const poster = project.fields.poster.fields
  const posterSrc = `${poster.file.url}?q=50`
  const posterSrcSet = `${poster.file.url}?q=50 1x, ${poster.file.url}?q=50 1.5x, ${poster.file.url}?q=50 2x`
  return (
    <Link to={`/film/${project.fields.url}`} state={{ project: project }}>
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
