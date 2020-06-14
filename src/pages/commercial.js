import React from "react"
import Layout from "../components/layout"
import PendingContainer from "../components/pending"

import { graphql } from "gatsby"
import Img from "gatsby-image"

import styled from "styled-components"

const ArrayContainer = styled.div`
  height: 100%;
  display: flex;
`

const ImageBounds = styled.div`
  height: 100vh;
`

const Commercial = ({ data }) => {
  return (
    <Layout>
      <ArrayContainer>
        {data.allContentfulFilm.edges.map(edge => {
          return <Img fixed={edge.node.poster.fixed} />
        })}
      </ArrayContainer>
    </Layout>
  )
}

export default Commercial

export const data = graphql`
  query {
    allContentfulFilm(sort: { fields: position, order: DESC }) {
      edges {
        node {
          titel
          id
          url
          poster {
            fixed {
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    }
  }
`
