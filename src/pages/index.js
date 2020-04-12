// Gatsby/React
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
// Components
import FilmPoster from "../components/filmPoster"
import Layout from "../components/layout"

const Home = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulFilm(sort: { fields: position, order: DESC }) {
        edges {
          node {
            titel
            id
            url
            poster {
              fixed(width: 200) {
                width
                height
                src
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <ul>
        {data.allContentfulFilm.edges.map(edge => {
          return (
            <li key={edge.node.id}>
              <FilmPoster node={edge.node} />
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Home
