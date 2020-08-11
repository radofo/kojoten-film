import React, { useEffect, useState } from "react"
import styled from "styled-components"
import kojotenlogo from "../media/kojoten_logo.svg"
import { screenSizes } from "../utils/mediaqueries"
import * as fetchContentful from "../utils/fetch"
import { defaultLocale } from "../utils/fetch"

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
  z-index: 999999;
  transform: ${props => props.transform};
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

const LpCover = ({ overlayOpen, toggleOverlay }) => {
  const [coverMedia, setCoverMedia] = useState({})
  const [transform, setTransform] = useState("translateY(0)")

  useEffect(() => {
    if (!overlayOpen) {
      setTransform("translateY(-100%)")
    }
  }, [overlayOpen])

  useEffect(() => {
    fetchContentful
      .getAllEntries({ content_type: "coverMedia", locale: defaultLocale })
      .then(apidata => {
        setCoverMedia({
          horizontalVideo:
            apidata.items[0].fields.horizontalVideo.fields.file.url,
          horizontalImage: {
            src: apidata.items[0].fields.horizontalImage.fields.file.url,
          },
        })
      })
  }, [])

  return (
    <VideoCover transform={transform}>
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
