import React from "react"

const FilmDetail = ({ location }) => {
  return <div>{location.state.project.fields.titel}</div>
}

export default FilmDetail
