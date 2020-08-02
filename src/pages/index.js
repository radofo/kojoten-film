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

  const [batch, setBatch] = useState([])
  const [batchWidth, setBatchWidth] = useState(0)
  const [overlayVisible, setOverlayVisible] = useState(modal)
  const [locale, setLocale] = useState(defaultLocale)

  useEffect(() => {
    fetchContentful
      .getAllEntries({ content_type: "film", locale: locale })
      .then(apidata => {
        const [contentfulBatch, contentfulBatchWidth] = getBatch(apidata.items)
        setBatch(contentfulBatch)
        setBatchWidth(contentfulBatchWidth)
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
      <ImageSlider
        overlayVisible={overlayVisible}
        batch={batch}
        batchWidth={batchWidth}
      />
    </Layout>
  )
}

export default Home
