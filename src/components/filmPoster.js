import React from "react"
import { Link } from "gatsby"

const FilmPoster = ({ node }) => {
  console.log("node: ", node)
  return (
    <div>
      <h1>
        <Link to={`/${node.url}`}>{node.titel}</Link>
      </h1>
      <img src={node.poster.fixed.src} alt={node.url} />
    </div>
  )
}

export default FilmPoster
