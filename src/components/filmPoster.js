import React from "react"
import styled from "styled-components"
import { minImageHeight } from "../utils/window"

const PosterImage = styled.img`
  height: 100vh;
  height: ${props => props.posterHeight}px;
  padding-top: var(--header-height);
`

const FilmPoster = ({ node, posterHeight }) => {
  const poster = node.poster.fixed
  return (
    <PosterImage
      posterHeight={posterHeight}
      srcSet={poster.srcSet}
      src={poster.src}
      alt={node.url}
    />
  )
}

export default FilmPoster

// <h1>
//   <Link to={`/${node.url}`}>{node.titel}</Link>
// </h1>
