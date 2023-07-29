import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/Layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
import NewsItem from "../components/newsItem"
import { Helmet } from "react-helmet"
import { LocaleContext } from "../context/LocaleContext"

const NewsContainer = styled.div`
  padding: 70px 3%;
  position: relative;
  z-index: 9;
`

const News = () => {
  const { locale } = useContext(LocaleContext)
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
      .then((apidata) => {
        mapContentfulData(apidata)
      })
  }, [locale])

  const mapContentfulData = (apidata) => {
    if (apidata?.items?.length > 0) {
      setNews(apidata.items)
    }
  }

  return (
    <Layout>
      <Helmet>
        <title>Kojoten | News</title>
        <meta name="description" content="Immer geupdatet die aktuellen News" />
      </Helmet>
      <NewsContainer>
        {news
          .filter((newsEl) => newsEl.fields?.bild?.fields?.file?.url)
          .map((item, index) => {
            return <NewsItem item={item} key={index} />
          })}
      </NewsContainer>
    </Layout>
  )
}

export default News
