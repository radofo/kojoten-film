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
  // Locales ===================================
  const { state } = location
  const initialLocale = state ? state.locale : defaultLocale
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

  const modal = state ? state.modal : true

  const [films, setFilms] = useState([])
  const [overlayOpen, setOverlayOpen] = useState(true)
  const [overlayExists, setOverlayExists] = useState(false)
  const [isComingSoon, setIsComingSoon] = useState(false)
  const [overlayDecided, setOverlayDecided] = useState(false)

  // Film Content Effect
  useEffect(() => {
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

  // Overlay Effect
  useEffect(() => {
    setOverlayExists(modal)
    setOverlayDecided(true)
  }, [])

  const toggleOverlay = () => {
    setOverlayOpen(false)
    setTimeout(() => {
      setOverlayExists(false)
    }, 1000)
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
