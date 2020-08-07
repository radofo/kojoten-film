import React from "react"
import { Router } from "@reach/router"
import Vimeo from "../components/Vimeo"

const Media = () => {
  return (
    <Router basepath="/media">
      <Vimeo path="/f/:id" />
      <Vimeo path="/c/:id" />
      <MediaOverview path="/" />
    </Router>
  )
}

const MediaOverview = () => {
  return <div>Media Overview</div>
}

export default Media
