import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
import { defaultLocale } from "../utils/fetch"
import NewsItem from "../components/NewsItem"
import Pending from "../components/pending"
import { Helmet } from "react-helmet"

const NewsContainer = styled.div`
  padding: var(--header-height) var(--padding-sides);
  position: relative;
  z-index: 9;
`

const News = ({ location }) => {
  // Locales ===================================
  const { state } = location
  const initialLocale = state && state.locale ? state.locale : defaultLocale
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

  // Misc ======================================
  const [comingSoon, setComingSoon] = useState(false)

  // Data ======================================
  const [news, setNews] = useState([])
  useEffect(() => {
    fetchContentful
      .getAllEntries(
        {
          content_type: "news",
          locale: locale,
          order: "-fields.datum",
        },
        window.location.host
      )
      .then(apidata => {
        mapContentfulData(apidata)
      })
  }, [locale])

  const mapContentfulData = apidata => {
    if (apidata.items.length > 0) {
      setNews(apidata.items)
    } else {
      setComingSoon(true)
    }
  }

  // Render =======================================
  return (
    <Layout locale={locale} changeLocale={changeLocale}>
      <Helmet>
        <title>Kojoten | News</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      {comingSoon ? (
        <Pending emoji="🗞" subject="News are" />
      ) : (
        <NewsContainer>
          {news.map((item, index) => {
            return <NewsItem item={item} key={index} />
          })}
        </NewsContainer>
      )}
    </Layout>
  )
}

export default News
