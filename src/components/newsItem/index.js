import React from "react"
import Moment from "react-moment"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../../utils/richText"
import {
  NewsHeader,
  NewsHeadline,
  NewsHeadlineMobile,
  NewsImage,
  NewsImageBox,
  NewsImageContainer,
  NewsItemContainer,
  NewsText,
  NewsContent,
  NewsDate,
} from "./newsItemStyles"
import { createSrcSet } from "../../utils/fetch"

const NewsItem = ({ item }) => {
  const newsContent = documentToReactComponents(
    item.fields.inhalt,
    renderOptions
  )
  const [src, srcSet] = createSrcSet({
    src: item?.fields?.bild?.fields?.file?.url,
    size: "800",
  })

  return (
    <NewsItemContainer>
      <NewsImageBox>
        <NewsImageContainer>
          <NewsImage src={src} srcSet={srcSet}></NewsImage>
          <NewsHeadlineMobile>
            <NewsHeader>{item.fields.titel}</NewsHeader>
            <NewsDate>
              <Moment format="D MMM YYYY">{item.fields.datum}</Moment>
            </NewsDate>
          </NewsHeadlineMobile>
        </NewsImageContainer>
      </NewsImageBox>
      <NewsText>
        <NewsHeadline>
          <NewsHeader>{item.fields.titel}</NewsHeader>
          <NewsDate>
            <Moment format="D MMM YYYY">{item.fields.datum}</Moment>
          </NewsDate>
        </NewsHeadline>
        <NewsContent>{newsContent}</NewsContent>
      </NewsText>
    </NewsItemContainer>
  )
}

export default NewsItem
