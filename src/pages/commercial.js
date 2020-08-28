import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
import { Link } from "gatsby"
import MediaContainer from "../components/mediaContainer"
import CommercialBasicInfo from "../components/CommercialBasicInfo"

import { defaultLocale } from "../utils/fetch"
import { screenSizes } from "../utils/mediaqueries"

// 3rd Party
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.min.css"
import "../styles/swiper.css"
import Pending from "../components/pending"

SwiperCore.use([Navigation])

const PlayButton = styled.i`
  font-size: 60px;
  color: rgba(255, 255, 255, 0.2);
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
  }
  @media ${screenSizes.desktop} {
    font-size: 80px;
  }
`

const NavButton = styled.button`
  color: rgba(255, 255, 255, 0.3);
  outline: none;
  font-size: 2em;
  background: rgba(0, 0, 0, 0);
  border: 0px solid rgba(0, 0, 0, 0);
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
  }
  @media ${screenSizes.desktop} {
    font-size: 2.5em;
  }
`

const NavRow = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: var(--padding-sides);
`

const Commercial = () => {
  const [commercials, setCommercials] = useState(null)
  const [vh, setVh] = useState("100vh")
  // Locales
  const [locale, setLocale] = useState(defaultLocale)

  useEffect(() => {
    setVh(window.innerHeight || "100vh")

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    fetchContentful
      .getAllEntries(
        { content_type: "commercial", locale: locale },
        window.location.host
      )
      .then(apidata => {
        setCommercials(apidata)
      })
  }, [locale])

  const handleResize = () => {
    setVh(window.innerHeight || "100vh")
  }

  const changeLocale = newLocale => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }
  return (
    <Layout locale={locale} changeLocale={changeLocale} transparentHeader>
      <Helmet>
        <title>Kojoten | Commercial</title>
        <meta name="description" content="Kojoten Film | Commercial" />
      </Helmet>
      {commercials && commercials.items.length === 0 ? (
        <Pending emoji="🍿" subject="Commercials are" />
      ) : (
        <Swiper
          style={{ height: vh }}
          initialSlide={0}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          loop
          followFinger={false}
          speed={400}
        >
          {commercials &&
            commercials.items.map((commercial, index) => {
              const commercialMedia = {
                horizontalImage: {
                  src: commercial.fields.poster.fields.file.url,
                },
              }
              return (
                <SwiperSlide key={index}>
                  <MediaContainer media={commercialMedia}></MediaContainer>
                  <CommercialBasicInfo
                    locale={locale}
                    details={commercial.fields}
                  />
                  <NavRow>
                    <NavButton>
                      <i className="fa fa-chevron-left swiper-prev"></i>
                    </NavButton>
                    <Link to={`/media/c/${commercial.fields.url}`}>
                      <PlayButton className={`far fa-play-circle`}></PlayButton>
                    </Link>
                    <NavButton>
                      <i className="fa fa-chevron-right swiper-next"></i>
                    </NavButton>
                  </NavRow>
                </SwiperSlide>
              )
            })}
        </Swiper>
      )}
    </Layout>
  )
}

export default Commercial
