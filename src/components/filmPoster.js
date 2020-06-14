import React from "react"
import styled from "styled-components"

const FilmPosterContainer = styled.div`
  height: 100%;
  position: relative;
`

const PosterImage = styled.img`
  height: 100%;
`

const FilmPoster = ({ node, index, firstBatch }) => {
  const poster = node.poster.fixed
  return (
    <FilmPosterContainer>
      <PosterImage
        className={firstBatch ? `firstBatchNode` : ""}
        srcSet={poster.srcSet}
        src={poster.src}
        alt={node.url}
      />
    </FilmPosterContainer>
  )
}

export default FilmPoster

// <h1>
//   <Link to={`/${node.url}`}>{node.titel}</Link>
// </h1>
