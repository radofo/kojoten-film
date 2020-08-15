import React from "react"
import { Router } from "@reach/router"
import Vimeo from "../components/Vimeo"
import styled, { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const FilmOverviewContainer = styled.div`
  background: black;
  height: 100vh;
  width: 100%;
`

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
  return (
    <React.Fragment>
      <GlobalStyle />
      <FilmOverviewContainer />
    </React.Fragment>
  )
}

export default Media
