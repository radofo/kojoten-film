import React from "react"
import { Router } from "@reach/router"
import FilmDetail from "../components/FilmDetail"

const Film = () => {
  return (
    <Router basepath="/film">
      <FilmDetail path="/:id" />
      <FilmOverview path="/" />
    </Router>
  )
}

const FilmOverview = () => {
  return <div>Overview</div>
}

export default Film
