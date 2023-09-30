import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
import Layout from "./Layout"
import FilmBasicInfo from "./FilmBasicInfo"
import FilmDetailInfo from "./FilmDetailInfo"
import MediaDiv from "./MediaDiv"

import {
  FeatherChevronDown,
  FeatherX,
  FilmDetailContainer,
  FilmDetailOverlay,
} from "./FilmDetailStyles"
import { Film, fromContentfulResponseToFilms } from "../contentful/film"
import { fromFilmToBackgroundMedia } from "../utils/media"

const FilmDetail = ({ location }) => {
  const slug = location.pathname.split("/")[2]
  const [filmDetails, setFilmDetails] = useState<Film>()
  const [infosOpen, setInfosOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const response = await fetchContentful.getAllEntriesWithAllLocales(
        "film",
        { "fields.url": slug }
      )
      const film = fromContentfulResponseToFilms(response)?.[0]
      setFilmDetails(film)
    })()
  }, [])

  const toggleInfosOpen = () => {
    setInfosOpen((currentInfosOpen) => {
      return !currentInfosOpen
    })
  }

  const filters = infosOpen ? "blur(10px)" : ""

  return (
    <Layout transparentHeader backButton>
      <Helmet>
        <title>{`Kojoten | ${
          filmDetails?.titel["de"] ?? "Film Details"
        }`}</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      <FilmDetailContainer>
        {filmDetails && (
          <MediaDiv
            media={fromFilmToBackgroundMedia(filmDetails, filters)}
            videoMode="controlled"
            requestedVideoPlaybackState={!infosOpen ? "playing" : "paused"}
          >
            <FilmDetailOverlay infosOpen={infosOpen} />
            {filmDetails && (
              <FilmDetailInfo infosOpen={infosOpen} details={filmDetails} />
            )}
            {filmDetails && (
              <FilmBasicInfo infosOpen={infosOpen} details={filmDetails} />
            )}
            {infosOpen ? (
              <FeatherX onClick={toggleInfosOpen} size={36} />
            ) : (
              <FeatherChevronDown onClick={toggleInfosOpen} size={40} />
            )}
          </MediaDiv>
        )}
      </FilmDetailContainer>
    </Layout>
  )
}

export default FilmDetail
