import React from "react"
import { Router } from "@reach/router"
import FilmDetail from "../components/FilmDetail"
import styled from "styled-components"
import Layout from "../components/layout"

const FilmOverviewContainer = styled.div`
  background: black;
  height: 100vh;
  width: 100%;
`

const Film = () => {
  return (
    <Router basepath="/film">
      <FilmDetail path="/:id" />
      <FilmOverview path="/" />
    </Router>
  )
}

const FilmOverview = () => {
  return (
    <Layout transparentHeader backButton>
      <FilmOverviewContainer />
    </Layout>
  )
}

export default Film
