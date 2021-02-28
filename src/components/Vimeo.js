import React, { useState, useEffect } from "react"
import Player from "@vimeo/player"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"
import VimeoControls from "./VimeoControls"
import { defaultLocale } from "../utils/fetch"
import { Link } from "gatsby"
import { headerHeight } from "../utils/window"
import { BackButton } from "../styles/styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body, html {
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
    Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: bold;
    background-color: black;
    --padding-sides: 3%;
    --text-color: #fff;
    --header-bgcolor: #000;
    --header-bgcolor-transparent: rgba(0, 0, 0, 0);
    --header-height: ${headerHeight}px;
    --slider-speed-factor: 160;
    --active-route: #ffd600;
    --highlight-color: #ffd600;
    --default-font-size: 16px;
  }
`

const VimeoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => {
    return props.vh
  }};
  overflow: hidden;
`

const VimeoAnchor = styled.div`
  width: 100%;
  position: relative;
`

// const BackButton = styled.i`
//   color: white;
//   &:hover {
//     cursor: pointer;
//   }
// `

const TopRow = styled.div`
  padding: 0 3%;
  height: ${headerHeight}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
`

const Vimeo = ({ location }) => {
  const slug = location.pathname.split("/")[3]
  const section =
    location.pathname.split("/")[2] === "f" ? "film" : "commercial"
  const [locale, setLocale] = useState(defaultLocale)
  const [vimeoPlayer, setVimeoPlayer] = useState(null)
  const [details, setDetails] = useState({})
  const [vh, setVh] = useState("100vh")

  useEffect(() => {
    setVh(`${window.innerHeight}px` || "100vh")
    fetchContentful
      .getAllEntries(
        {
          content_type: section,
          locale: locale,
          "fields.url": slug,
        },
        window.location.host
      )
      .then(data => {
        const details = data.items[0].fields
        setDetails(details)
        var options = {
          id: details.vimeoId,
          controls: false,
          autoplay: true,
          responsive: true,
          transparent: false,
        }
        var player = new Player("vimeo-container", options)
        setVimeoPlayer(player)
      })
  }, [])

  const enterFullScreen = () => {
    vimeoPlayer
      .requestFullscreen()
      .then(function() {
        // the player exits fullscreen
      })
      .catch(function(error) {})
  }

  return (
    <VimeoContainer vh={vh}>
      <GlobalStyle />
      <Helmet>
        <title>Kojoten | {details.titel || "Media"}</title>
        <link href="/fontawesome/css/all.css" rel="stylesheet"></link>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      <VimeoAnchor id="vimeo-container">
        <TopRow>
          <Link to={`/${section === "film" ? `film/${details.url}` : section}`}>
            <BackButton size={36} />
          </Link>
        </TopRow>
        <VimeoControls player={vimeoPlayer} onClick={enterFullScreen} />
      </VimeoAnchor>
    </VimeoContainer>
  )
}

export default Vimeo
