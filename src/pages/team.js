import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import MediaContainer from "../components/mediaContainer"
import { graphql, useStaticQuery } from "gatsby"

const TeamContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`

const TeamDescription = styled.p`
  position: absolute;
  bottom: calc(var(--padding-sides) * 1.5);
  left: calc(var(--padding-sides) * 1.5);
  color: var(--highlight-color);
  font-weight: normal;
  max-width: 50%;
`

const Team = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulTeam {
        edges {
          node {
            backgroundImage {
              id
              fixed {
                src
                srcSet
              }
            }
            description {
              description
            }
          }
        }
      }
    }
  `)

  const node = data.allContentfulTeam.edges[0].node
  const media = {
    horizontalImage: {
      src: node.backgroundImage.fixed.src,
      srcSet: node.backgroundImage.fixed.srcSet,
    },
  }

  return (
    <Layout transparentHeader>
      <TeamContainer>
        <MediaContainer media={media}>
          <TeamDescription>{node.description.description}</TeamDescription>
        </MediaContainer>
      </TeamContainer>
    </Layout>
  )
}

export default Team
