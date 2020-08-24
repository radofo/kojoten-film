// Gatsby/React
import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
// Components
import Layout from "../components/layout"
import ImageSlider from "../components/imageSlider"
import LpCover from "../components/lpCover"
// Utils
import { defaultLocale } from "../utils/fetch"
import Pending from "../components/pending"

const Home = ({ location }) => {
  const { state } = location
  const modal = state ? state.modal : true

  const [films, setFilms] = useState([])
  const [overlayOpen, setOverlayOpen] = useState(true)
  const [overlayExists, setOverlayExists] = useState(false)
  const [locale, setLocale] = useState(defaultLocale)
  const [isComingSoon, setIsComingSoon] = useState(false)
  const [overlayDecided, setOverlayDecided] = useState(false)

  useEffect(() => {
    setOverlayExists(modal)
    setOverlayDecided(true)
    fetchContentful
      .getAllEntries(
        { content_type: "film", locale: locale },
        window.location.host
      )
      .then(apidata => {
        if (apidata.items.length > 0) {
          setFilms(apidata.items)
        } else {
          setIsComingSoon(true)
        }
      })
  }, [locale])

  const toggleOverlay = () => {
    setOverlayOpen(false)
    setTimeout(() => {
      setOverlayExists(false)
    }, 1000)
  }

  const changeLocale = newLocale => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  return (
    <Layout
      locale={locale}
      changeLocale={changeLocale}
      overlayDecided={overlayDecided}
    >
      <Helmet>
        <title>Kojoten | Film</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {overlayExists && (
        <LpCover overlayOpen={overlayOpen} toggleOverlay={toggleOverlay} />
      )}
      {isComingSoon ? (
        <Pending emoji="🎥" subject="Films are" />
      ) : (
        <ImageSlider overlayOpen={overlayOpen} films={films} />
      )}
    </Layout>
  )
}

export default Home
