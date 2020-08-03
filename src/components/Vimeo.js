import React, { useState, useEffect } from "react"
import Player from "@vimeo/player"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"
import VimeoControls from "./VimeoControls"
import { defaultLocale } from "../utils/fetch"
import { Link } from "gatsby"

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
  }
`

const VimeoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
`

const VimeoAnchor = styled.div`
  width: 100%;
  position: relative;
`

const BackButton = styled.i`
  color: white;
  position: fixed;
  top: 50px;
  left: 50px;
  z-index: 999;
  &:hover {
    cursor: pointer;
  }
`

const Vimeo = ({ location }) => {
  const slug = location.pathname.split("/")[2]
  const [locale, setLocale] = useState(defaultLocale)
  const [vimeoPlayer, setVimeoPlayer] = useState(null)
  const [details, setDetails] = useState({})

  useEffect(() => {
    fetchContentful
      .getAllEntries({
        content_type: "film",
        locale: locale,
        "fields.url": slug,
      })
      .then(data => {
        const details = data.items[0].fields
        setDetails(details)
        var options = {
          id: details.vimeoId,
          controls: false,
          autoplay: true,
          responsive: true,
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
    <VimeoContainer>
      <GlobalStyle />
      <Helmet>
        <title>Kojoten | {details.titel || "Media"}</title>
        <link href="/fontawesome/css/all.css" rel="stylesheet"></link>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <VimeoAnchor id="vimeo-container">
        <Link to={`/film/${details.url}`}>
          <BackButton className="fa fa-arrow-left fa-2x"></BackButton>
        </Link>
        <VimeoControls player={vimeoPlayer} onClick={enterFullScreen} />
      </VimeoAnchor>
    </VimeoContainer>
  )
}

export default Vimeo
