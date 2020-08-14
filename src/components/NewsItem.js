import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { defaultLocale } from "../utils/fetch"
import Moment from "react-moment"
import { screenSizes } from "../utils/mediaqueries"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"

const NewsItemContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  &:not(:first-child) {
    margin-top: 70px;
  }
  @media ${screenSizes.desktop} {
    flex-direction: row;
  }
`

const NewsText = styled.div`
  width: 100%;
  @media ${screenSizes.desktop} {
    padding-left: 30px;
    margin-top: -6px;
  }
`

const NewsImageBox = styled.div`
  width: 100%;
  padding-top: 66.6%;
  position: relative;
  @media ${screenSizes.desktop} {
    align-self: flex-start;
    width: 30%;
    min-width: 30%;
    padding-top: 20%;
  }
`

const NewsContent = styled.div`
  margin-top: 20px;
  font-size: 14px;
  & p {
    margin-bottom: 5px;
  }
`

const NewsImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const NewsImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 3px;
`

const NewsHeader = styled.h1`
  font-size: 24px;
  background: rgba(0, 0, 0, 0.3);
  margin-bottom: 3px;
  @media ${screenSizes.desktop} {
    font-size: 30px;
  }
`
const NewsDate = styled.span`
  background: rgba(0, 0, 0, 0.3);
`

const NewsHeadlineMobile = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 3%;
  @media ${screenSizes.desktop} {
    display: none;
  }
`

const NewsHeadline = styled.div`
  display: none;
  @media ${screenSizes.desktop} {
    display: block;
  }
`

const NewsItem = ({ item }) => {
  const newsContent = documentToReactComponents(
    item.fields.inhalt,
    renderOptions
  )
  return (
    <NewsItemContainer>
      <NewsImageBox>
        <NewsImageContainer>
          <NewsImage src={item.fields.bild.fields.file.url}></NewsImage>
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
