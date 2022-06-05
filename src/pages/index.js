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
  const [locale, setLocale] = useState()
  const [films, setFilms] = useState([])
  const [overlayOpen, setOverlayOpen] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const [isComingSoon, setIsComingSoon] = useState(false)
  const [overlayDecided, setOverlayDecided] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const { state } = location
    // Modal
    const showModal = state?.modal === false ? false : true
    setShowOverlay(showModal)
    setOverlayDecided(true)
    // Locale
    const storageLocale = localStorage.getItem("kojotenLanguage")
    setLocale(storageLocale ?? defaultLocale)
    // Window Height
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleResize = () => {
    setWindowHeight(window.innerHeight)
  }

  useEffect(() => {
    if (locale) {
      fetchContentful
        .getAllEntries(
          { content_type: "film", locale: locale, order: "fields.position" },
          window.location.host
        )
        .then((apidata) => {
          if (apidata.items.length > 0) {
            setFilms(apidata.items)
          } else {
            setIsComingSoon(true)
          }
        })
    }
  }, [locale])

  const changeLocale = (newLocale) => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  const toggleOverlay = () => {
    setOverlayOpen(false)
    setTimeout(() => {
      setShowOverlay(false)
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
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      {showOverlay && (
        <LpCover overlayOpen={overlayOpen} toggleOverlay={toggleOverlay} />
      )}
      {isComingSoon ? (
        <Pending emoji="🎥" subject="Films are" />
      ) : (
        <ImageSlider height={windowHeight} films={films} locale={locale} />
      )}
    </Layout>
  )
}

export default Home
