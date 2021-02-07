import React, { useEffect, useState } from "react"
import styled from "styled-components"
import kojotenlogo from "../media/kojoten_logo_new.png"
import { screenSizes } from "../utils/mediaqueries"
import * as fetchContentful from "../utils/fetch"
import { defaultLocale } from "../utils/fetch"
import { ArrowUp } from "react-feather"
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
  transform: ${(props) => props.transform};
  opacity: ${(props) => props.opacity};
  z-index: 999999;
  transition: opacity 0.8s cubic-bezier(0.38, 1.1, 0.77, 0.86),
    transform 0.8s cubic-bezier(0.38, 1.1, 0.77, 0.86);
`

const ToggleButton = styled.button`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  background-color: rgba(0, 0, 0, 0);

  @media ${screenSizes.tablet} {
    bottom: 50px;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
`
const ArrowUpFeather = styled((props) => <ArrowUp {...props} />)`
  color: rgba(255, 255, 255);
  &:hover {
    color: var(--highlight-color);
  }
`

const KojotenLogo = styled.img`
  position: absolute;
  bottom: 40px;
  left: 10px;
  width: 100px;
  @media ${screenSizes.tablet} {
    left: 50px;
    bottom: 50px;
    width: 150px;
  }
`

const LpCover = ({ overlayOpen, toggleOverlay }) => {
  const [coverMedia, setCoverMedia] = useState({})
  const [transform, setTransform] = useState("translateY(0)")
  const [opacity, setOpacity] = useState("1")

  useEffect(() => {
    if (!overlayOpen) {
      setTransform("translateY(-20%)")
      setOpacity("0")
    }
  }, [overlayOpen])

  useEffect(() => {
    fetchContentful
      .getAllEntries(
        { content_type: "coverMedia", locale: defaultLocale },
        window.location.host
      )
      .then((apidata) => {
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
    <VideoCover transform={transform} opacity={opacity}>
      <MediaContainer media={coverMedia}>
        <KojotenLogo src={kojotenlogo} alt="Kojoten Film" />
        <ToggleButton onClick={toggleOverlay}>
          {/* <ChevronDown className="fas fa-arrow-up"></ChevronDown> */}
          <ArrowUpFeather size={40} />
        </ToggleButton>
      </MediaContainer>
    </VideoCover>
  )
}

export default LpCover
