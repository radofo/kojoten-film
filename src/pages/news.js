import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
import { defaultLocale } from "../utils/fetch"
import NewsItem from "../components/NewsItem"
import Pending from "../components/pending"

const NewsContainer = styled.div`
  padding: var(--header-height) var(--padding-sides);
  position: relative;
  z-index: 9;
`

const News = () => {
  const [news, setNews] = useState([])
  const [comingSoon, setComingSoon] = useState(false)
  useEffect(() => {
    fetchContentful
      .getAllEntries({
        content_type: "news",
        locale: defaultLocale,
        order: "-fields.datum",
      })
      .then(apidata => {
        if (apidata.items.length > 0) {
          setNews(apidata.items)
        } else {
          setComingSoon(true)
        }
      })
  }, [])

  return (
    <Layout>
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
