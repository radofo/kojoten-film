import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
// Components
import Layout from "../components/layout"
import styled from "styled-components"
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

const FilmDetail = ({ location }) => {
  const slug = location.pathname.split("/")[2]
  const [filmDetails, setFilmDetails] = useState({})
  const [locale, setLocale] = useState(defaultLocale)
  const [filmMedia, setFilmMedia] = useState({})

  useEffect(() => {
    fetchContentful
      .getAllEntries({
        content_type: "film",
        locale: locale,
        "fields.url": slug,
      })
      .then(data => {
        const [src, srcSet] = createSrcSet(
          data.items[0].fields.hintergrundBild.fields.file.url
        )
        setFilmDetails(data.items[0].fields)
        setFilmMedia({
          horizontalImage: {
            src,
            srcSet,
          },
          filters: "",
        })
      })
  }, [locale])

  return (
    <Layout>
      <Helmet>
        <title>{`Kojoten - ${filmDetails.titel || "Film Details"}`}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <FilmDetailContainer>
        <MediaContainer media={filmMedia}>{filmDetails.titel}</MediaContainer>
      </FilmDetailContainer>
    </Layout>
  )
}

export default FilmDetail
