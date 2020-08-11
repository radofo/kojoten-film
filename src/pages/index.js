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

const Home = ({ location }) => {
  const { state } = location
  const modal = state ? state.modal : true
  console.log("modal: ", modal)

  const [films, setFilms] = useState([])
  const [overlayOpen, setOverlayOpen] = useState(true)
  const [overlayExists, setOverlayExists] = useState(false)
  const [locale, setLocale] = useState(defaultLocale)
  console.log("overlayOpen: ", overlayOpen)

  useEffect(() => {
    console.log("overlayOpen useeffect: ", overlayOpen)
    setOverlayExists(modal)
    fetchContentful
      .getAllEntries({ content_type: "film", locale: locale })
      .then(apidata => {
        setFilms(apidata.items)
      })
  }, [])

  const toggleOverlay = () => {
    console.log("overlayOpen toggle: ", overlayOpen)
    setOverlayOpen(false)
    setTimeout(() => {
      setOverlayExists(false)
    }, 1000)
  }

  console.log("overlayExists: ", overlayExists)
  return (
    <Layout>
      <Helmet>
        <title>Kojoten | Film</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {overlayExists && (
        <LpCover overlayOpen={overlayOpen} toggleOverlay={toggleOverlay} />
      )}
      <ImageSlider overlayOpen={overlayOpen} films={films} />
    </Layout>
  )
}

export default Home
