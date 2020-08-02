import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { createSrcSet } from "../utils/fetch"

const PosterImage = styled.img`
  height: 100vh;
  height: ${props => props.posterHeight}px;
  padding-top: var(--header-height);
`

const FilmPoster = ({ project, posterHeight }) => {
  const poster = project.fields.poster.fields
  const [posterSrc, posterSrcSet] = createSrcSet(poster.file.url)
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
