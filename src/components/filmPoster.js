import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const FilmPosterContainer = styled.div`
  height: 100%;
  position: relative;
`

const PosterReplacement = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
`

const PosterImage = styled.img`
  height: 100%;
`

const FilmPoster = ({ node, index }) => {
  return (
    <FilmPosterContainer>
      {/* <PosterReplacement>{index}</PosterReplacement> */}
      <PosterImage src={node.poster.fixed.src} alt={node.url} />
    </FilmPosterContainer>
  )
}

export default FilmPoster

// <h1>
//   <Link to={`/${node.url}`}>{node.titel}</Link>
// </h1>
