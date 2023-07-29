import React, { useContext, useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import ImageSlider from "../components/imageSlider"
import { LocaleContext } from "../context/LocaleContext"

const Home = () => {
  const { locale } = useContext(LocaleContext)

  const [films, setFilms] = useState([])
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    // Window Height Listener
    handleResize()
    window.addEventListener("resize", handleResize)
    // Cleanup Listener
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
          }
        })
    }
  }, [locale])

  return (
    <Layout>
      <Helmet>
        <title>Kojoten | Film</title>
        <meta
          name="description"
          content="Produktionsfirma für hochwertige Werbefilme, sowie fiktionale und dokumentarische Stoffe. Gegründet von Magdalena Wolff und Stefanie Gödicke (2016)."
        />
      </Helmet>
      <ImageSlider height={windowHeight} films={films} locale={locale} />
    </Layout>
  )
}

export default Home
