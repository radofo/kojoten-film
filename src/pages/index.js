// Gatsby/React
import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { Helmet } from "react-helmet"
// Components
import Layout from "../components/Layout"
import ImageSlider from "../components/imageSlider"
// Utils
import { defaultLocale } from "../utils/fetch"
import Pending from "../components/pending"

const Home = () => {
  const [locale, setLocale] = useState()
  const [films, setFilms] = useState([])
  const [isComingSoon, setIsComingSoon] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    // Locale
    const storageLocale = localStorage.getItem("kojotenLanguage")
    setLocale(storageLocale ?? defaultLocale)
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

  return (
    <Layout locale={locale} changeLocale={changeLocale}>
      <Helmet>
        <title>Kojoten | Film</title>
        <meta
          name="description"
          content="Produktionsfirma für hochwertige Werbefilme, sowie fiktionale und dokumentarische Stoffe. Gegründet von Magdalena Wolff und Stefanie Gödicke (2016)."
        />
      </Helmet>
      {isComingSoon ? (
        <Pending emoji="🎥" subject="Films are" />
      ) : (
        <ImageSlider height={windowHeight} films={films} locale={locale} />
      )}
    </Layout>
  )
}

export default Home
