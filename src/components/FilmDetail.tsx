import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
import Layout from "./Layout"
import FilmBasicInfo from "./FilmBasicInfo"
import FilmDetailInfo from "./FilmDetailInfo"

import MediaContainer from "./MediaContainer"
import {
  FeatherChevronDown,
  FeatherX,
  FilmDetailContainer,
  FilmDetailOverlay,
} from "./FilmDetailStyles"
import { Film, fromContentfulResponseToFilms } from "../contentful/film"
import { Media } from "../types/general"

const FilmDetail = ({ location }) => {
  const slug = location.pathname.split("/")[2]
  const [filmDetails, setFilmDetails] = useState<Film>()
  const [filmMedia, setFilmMedia] = useState<Media>()
  const [infosOpen, setInfosOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const response = await fetchContentful.getAllEntriesWithAllLocales(
        "film",
        { "fields.url": slug }
      )
      const film = fromContentfulResponseToFilms(response)?.[0]
      setFilmDetails(film)
      setFilmMedia({
        image: {
          src: film.hintergrundBild?.url,
          filters: infosOpen ? "blur(5px)" : "",
        },
      })
    })()
  }, [])

  const toggleInfosOpen = () => {
    const newInfosOpen = !infosOpen
    setFilmMedia((filmMedia) => ({
      ...filmMedia,
      image: {
        ...filmMedia?.image,
        filters: newInfosOpen ? "blur(5px)" : "",
      },
    }))
    setInfosOpen(newInfosOpen)
  }

  return (
    <Layout transparentHeader backButton>
      <Helmet>
        <title>{`Kojoten | ${
          filmDetails?.titel["de"] ?? "Film Details"
        }`}</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      <FilmDetailContainer>
        <MediaContainer
          playbackLink={
            filmDetails?.vimeoId ? `/media/f/${filmDetails.url}` : null
          }
          media={filmMedia}
        />
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
      </FilmDetailContainer>
    </Layout>
  )
}

export default FilmDetail
