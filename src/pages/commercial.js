import React from "react"
import Layout from "../components/layout"
import PendingContainer from "../components/pending"

import { graphql } from "gatsby"

import styled from "styled-components"

const VPContainer = styled.div`
  border: 1px solid red;
  padding-top: var(--header-height);
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
`

const Commercial = ({ data }) => {
  return (
    <Layout>
      <VPContainer></VPContainer>
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
