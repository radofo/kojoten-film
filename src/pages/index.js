// Gatsby/React
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
// Components
import FilmPoster from "../components/filmPoster"

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
              fixed(width: 800) {
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
    <div>
      <ul>
        {data.allContentfulFilm.edges.map(edge => {
          return (
            <li key={edge.node.id}>
              <FilmPoster node={edge.node} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
