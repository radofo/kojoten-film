import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
import styled from "styled-components"
// Components
import Layout from "../components/layout"
import FilmDetailCover from "../components/FilmDetailCover"
import FilmDetailInfo from "../components/FilmDetailInfo"
// Utils
import { screenSizes } from "../utils/mediaqueries"
import { defaultLocale, createSrcSet } from "../utils/fetch"

import MediaContainer from "./mediaContainer"

const FilmDetailContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: black;
`

const FilmDetailToggle = styled.i`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  color: white;
  &:hover {
    cursor: pointer;
  }
`

const FilmDetailOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => {
    return props.infosOpen ? "block" : "none"
  }};
  top: 0;
  left: 0;
`

const FilmDetail = ({ location }) => {
  const slug = location.pathname.split("/")[2]
  const [filmDetails, setFilmDetails] = useState({})
  const [locale, setLocale] = useState(defaultLocale)
  const [filmMedia, setFilmMedia] = useState({})
  const [infosOpen, setInfosOpen] = useState(false)

  useEffect(() => {
    fetchContentful
      .getAllEntries({
        content_type: "film",
        locale: locale,
        "fields.url": slug,
      })
      .then(data => {
        if (data.items[0].fields.hintergrundBild) {
          const [src, srcSet] = createSrcSet(
            data.items[0].fields.hintergrundBild.fields.file.url
          )
          setFilmDetails(data.items[0].fields)
          setFilmMedia({
            horizontalImage: {
              src,
              srcSet,
            },
            filters: "0",
          })
        }
      })
  }, [locale])

  const toggleInfosOpen = () => {
    setFilmMedia({
      ...filmMedia,
      filters: infosOpen ? "" : "blur(3px)",
    })
    setInfosOpen(!infosOpen)
  }

  return (
    <Layout transparentHeader backButton>
      <Helmet>
        <title>{`Kojoten | ${filmDetails.titel || "Film Details"}`}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <FilmDetailContainer infosOpen={infosOpen}>
        <MediaContainer media={filmMedia}>
          <FilmDetailOverlay infosOpen={infosOpen} />
          <FilmDetailInfo infosOpen={infosOpen} details={filmDetails} />
          <FilmDetailCover infosOpen={infosOpen} details={filmDetails} />
          <FilmDetailToggle
            onClick={toggleInfosOpen}
            className={`fa fa-${infosOpen ? "times" : "chevron-down"} fa-2x`}
          ></FilmDetailToggle>
        </MediaContainer>
      </FilmDetailContainer>
    </Layout>
  )
}

export default FilmDetail
