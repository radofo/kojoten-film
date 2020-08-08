import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
import { defaultLocale } from "../utils/fetch"
import NewsItem from "../components/NewsItem"

const NewsContainer = styled.div`
  padding: var(--header-height) var(--padding-sides);
`

const News = () => {
  const [news, setNews] = useState([])
  useEffect(() => {
    fetchContentful
      .getAllEntries({
        content_type: "news",
        locale: defaultLocale,
        order: "-fields.datum",
      })
      .then(apidata => {
        setNews(apidata.items)
      })
  }, [])

  return (
    <Layout>
      <NewsContainer>
        {news.map((item, index) => {
          return <NewsItem item={item} key={index} />
        })}
      </NewsContainer>
    </Layout>
  )
}

export default News
