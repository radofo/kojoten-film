// Gatsby/React
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
// Hooks
import { useLocale } from "../hooks/useLocale"
import { useContentfulEntries } from "../hooks/useContentful"
// Components
import Layout from "../components/layout"
import ImageSlider from "../components/imageSlider"
import LpCover from "../components/lpCover"
import Pending from "../components/pending"

const Home = ({ location }) => {
  const { state } = location
  const modal = state ? state.modal : true

  const [locale, changeLocale] = useLocale(state)

  const [overlayOpen, setOverlayOpen] = useState(true)
  const [overlayExists, setOverlayExists] = useState(false)
  const [overlayDecided, setOverlayDecided] = useState(false)

  const [films, isEmpty] = useContentfulEntries({
    params: { content_type: "film", locale: locale, order: "fields.position" },
    hostname: window.location.host,
  })

  // Overlay
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
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      {overlayExists && (
        <LpCover overlayOpen={overlayOpen} toggleOverlay={toggleOverlay} />
      )}
      {isEmpty ? (
        <Pending emoji="🎥" subject="Films are" />
      ) : (
        <ImageSlider overlayOpen={overlayOpen} films={films} locale={locale} />
      )}
    </Layout>
  )
}

export default Home
