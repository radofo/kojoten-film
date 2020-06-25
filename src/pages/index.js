// Gatsby/React
import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
// Components
import Layout from "../components/layout"
import ImageSlider from "../components/imageSlider"
// Utils
import { getBatch } from "../utils/window"

const Home = () => {
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

  const [batch, setBatch] = useState([])
  const [batchWidth, setBatchWidth] = useState(0)

  useEffect(() => {
    const [contentfulBatch, contentfulBatchWidth] = getBatch(
      data.allContentfulFilm.edges
    )
    setBatch(contentfulBatch)
    setBatchWidth(contentfulBatchWidth)
  }, [])

  return (
    <Layout>
      <ImageSlider batch={batch} batchWidth={batchWidth} />
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
