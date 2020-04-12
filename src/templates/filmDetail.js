import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    contentfulFilm(url: { eq: $slug }) {
      titel
      director
      genres
      lngeInMinuten
    }
  }
`

// The result from the query will (magically) be available as props.data in the component
const FilmDetail = props => {
  return (
    <Layout transparent>
      <h1>{props.data.contentfulFilm.titel}</h1>
    </Layout>
  )
}

export default FilmDetail
