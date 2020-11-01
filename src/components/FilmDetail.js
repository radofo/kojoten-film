import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
import styled from "styled-components"
// Components
import Layout from "../components/layout"
import FilmBasicInfo from "./FilmBasicInfo"
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
  z-index: 9;
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
  // Locales ===================================
  const { state } = location
  const initialLocale = state && state.locale ? state.locale : defaultLocale
  const [locale, setLocale] = useState(initialLocale)
  useEffect(() => {
    const storageLocale = localStorage.getItem("kojotenLanguage")
    if (storageLocale && initialLocale !== storageLocale) {
      setLocale(storageLocale)
    }
  }, [])

  const changeLocale = newLocale => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }
  const slug = location.pathname.split("/")[2]
  const [filmDetails, setFilmDetails] = useState({})
  const [filmMedia, setFilmMedia] = useState({})
  const [infosOpen, setInfosOpen] = useState(false)

  useEffect(() => {
    fetchContentful
      .getAllEntries(
        {
          content_type: "film",
          locale: locale,
          "fields.url": slug,
        },
        window.location.host
      )
      .then(data => {
        if (data.items.length > 0) {
          setFilmDetails(data.items[0].fields)
          if (
            data.items[0].fields.hintergrundBild &&
            data.items[0].fields.hintergrundBild.fields.file
          ) {
            setFilmMedia({
              horizontalImage: {
                src: data.items[0].fields.hintergrundBild.fields.file.url,
              },
              filters: infosOpen ? "blur(5px)" : "",
            })
          }
        }
      })
  }, [locale])

  const toggleInfosOpen = () => {
    setFilmMedia({
      ...filmMedia,
      filters: infosOpen ? "" : "blur(5px)",
    })
    setInfosOpen(!infosOpen)
  }

  return (
    <Layout
      locale={locale}
      changeLocale={changeLocale}
      transparentHeader
      backButton
    >
      <Helmet>
        <title>{`Kojoten | ${filmDetails.titel || "Film Details"}`}</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      <FilmDetailContainer infosOpen={infosOpen}>
        <MediaContainer
          customLink={
            filmDetails.vimeoId ? `/media/f/${filmDetails.url}` : null
          }
          media={filmMedia}
        ></MediaContainer>
        <FilmDetailOverlay infosOpen={infosOpen} />
        <FilmDetailInfo
          infosOpen={infosOpen}
          details={filmDetails}
          locale={locale}
        />
        <FilmBasicInfo
          locale={locale}
          infosOpen={infosOpen}
          details={filmDetails}
        />

        <FilmDetailToggle
          onClick={toggleInfosOpen}
          className={`fa fa-${infosOpen ? "times" : "chevron-down"} fa-2x`}
        ></FilmDetailToggle>
      </FilmDetailContainer>
    </Layout>
  )
}

export default FilmDetail
