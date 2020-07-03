// Gatsby/React
import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
// Components
import Layout from "../components/layout"
import ImageSlider from "../components/imageSlider"
import LpCover from "../components/lpCover"
// Utils
import { getBatch } from "../utils/window"

const Home = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulFilm(sort: { fields: position, order: DESC }) {
        edges {
          node {
            titel
            id
            url
            poster {
              fixed {
                ...GatsbyContentfulFixed
              }
            }
          }
        }
      }
    }
  `)
  const { state } = location
  const modal = state ? state.modal : true

  const [batch, setBatch] = useState([])
  const [batchWidth, setBatchWidth] = useState(0)
  const [overlayVisible, setOverlayVisible] = useState(modal)

  useEffect(() => {
    const [contentfulBatch, contentfulBatchWidth] = getBatch(
      data.allContentfulFilm.edges
    )
    setBatch(contentfulBatch)
    setBatchWidth(contentfulBatchWidth)
  }, [])

  const toggleOverlay = () => {
    setOverlayVisible(false)
  }

  return (
    <Layout>
      <Helmet>
        <title>Kojoten - Film</title>
        <meta name="description" content="Helmet application" />
        <link href="/fontawesome/css/all.css" rel="stylesheet"></link>
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

// import { debounce } from "../utils/window"

// const ResetButton = styled.button`
//   position: absolute;
//   top: 60%;
//   left: 60%;
// `
// const [sliderKey, setSliderKey] = useState(0)
// const resetClicked = debounce(function() {
//   const newKey = sliderKey + 1
//   setSliderKey(newKey)
// }, 750)
