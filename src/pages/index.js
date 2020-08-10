// Gatsby/React
import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
// Components
import Layout from "../components/layout"
import ImageSlider from "../components/imageSlider"
import LpCover from "../components/lpCover"
// Utils
import { getBatch } from "../utils/window"
import { defaultLocale } from "../utils/fetch"

const Home = ({ location }) => {
  const { state } = location
  const modal = state ? state.modal : true

  const [films, setFilms] = useState([])
  const [overlayVisible, setOverlayVisible] = useState(modal)
  const [locale, setLocale] = useState(defaultLocale)

  useEffect(() => {
    fetchContentful
      .getAllEntries({ content_type: "film", locale: locale })
      .then(apidata => {
        setFilms(apidata.items)
      })
  }, [])

  const toggleOverlay = () => {
    setOverlayVisible(false)
  }

  return (
    <Layout>
      <Helmet>
        <title>Kojoten - Film</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <LpCover overlayVisible={overlayVisible} toggleOverlay={toggleOverlay} />
      <ImageSlider overlayVisible={overlayVisible} films={films} />
    </Layout>
  )
}

export default Home
