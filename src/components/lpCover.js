import React, { useEffect, useState } from "react"
import styled from "styled-components"
import kojotenlogo from "../media/kojoten_logo.svg"
import { graphql, useStaticQuery } from "gatsby"
import { screenSizes } from "../utils/mediaqueries"

// Components
import MediaContainer from "./mediaContainer"

const VideoCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 999;
  transform: ${props => {
    return props.show ? "translateY(0)" : "translateY(-100%)"
  }};
  transition: transform 0.5s ease-in;
`

const ToggleButton = styled.button`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  background-color: rgba(0, 0, 0, 0);

  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
`
const ChevronDown = styled.i`
  font-size: 30px;
  color: white;
`

const KojotenLogo = styled.img`
  position: absolute;
  bottom: 50px;
  left: 10px;
  width: 100px;
  @media ${screenSizes.tablet} {
    left: 50px;
    width: 150px;
  }
`

const LpCover = ({ overlayVisible, toggleOverlay }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCoverMedia {
        edges {
          node {
            horizontalVideo {
              file {
                url
              }
            }
            horizontalImage {
              fixed {
                src
              }
            }
          }
        }
      }
    }
  `)

  const [coverMedia, setCoverMedia] = useState({})

  useEffect(() => {
    const mediaNode = data.allContentfulCoverMedia.edges[0].node
    setCoverMedia({
      horizontalVideo: mediaNode.horizontalVideo.file.url,
      horizontalImage: {
        src: mediaNode.horizontalImage.fixed.src,
      },
    })
  }, [])

  return (
    <VideoCover show={overlayVisible}>
      <MediaContainer media={coverMedia}>
        <KojotenLogo src={kojotenlogo} alt="Kojoten Film" />
        <ToggleButton onClick={toggleOverlay}>
          <ChevronDown className="fas fa-chevron-down"></ChevronDown>
        </ToggleButton>
      </MediaContainer>
    </VideoCover>
  )
}

export default LpCover
