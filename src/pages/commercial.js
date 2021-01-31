import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
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

const NavButton = styled.button`
  color: #c1c1c1;
  outline: none;
  opacity: 0.4;
  font-size: 2em;
  background: rgba(0, 0, 0, 0);
  border: 0px solid rgba(0, 0, 0, 0);
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  @media ${screenSizes.desktop} {
    font-size: 2.5em;
  }
  z-index: 9999;
  position: fixed;
  left: ${(props) => {
    return props.left ? 0 : "initial"
  }};
  right: ${(props) => {
    return props.right ? 0 : "initial"
  }};
  top: 50%;
  transform: translateY(-50%);
  padding: var(--padding-sides);
`

const Commercial = ({ location }) => {
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

  const changeLocale = (newLocale) => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  const [commercials, setCommercials] = useState(null)
  const [vh, setVh] = useState("100vh")

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
        {
          content_type: "commercial",
          locale: locale,
          order: "fields.position",
        },
        window.location.host
      )
      .then((apidata) => {
        apidata.items.push(apidata.items.shift()) // Workaround because Swiper starts with the last element for some reason
        setCommercials(apidata)
      })
  }, [locale])

  const handleResize = () => {
    setVh(window.innerHeight || "100vh")
  }

  return (
    <Layout locale={locale} changeLocale={changeLocale} transparentHeader>
      <Helmet>
        <title>Kojoten | Commercial</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      {commercials && commercials.items.length === 0 ? (
        <Pending emoji="🍿" subject="Commercials are" />
      ) : (
        <Swiper
          style={{ height: vh }}
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
                  <MediaContainer
                    media={commercialMedia}
                    customLink={`/media/c/${commercial.fields.url}`}
                  ></MediaContainer>
                  <CommercialBasicInfo
                    locale={locale}
                    details={commercial.fields}
                  />
                </SwiperSlide>
              )
            })}
          <NavButton left>
            <i className="fa fa-chevron-left swiper-prev"></i>
          </NavButton>
          <NavButton right>
            <i className="fa fa-chevron-right swiper-next"></i>
          </NavButton>
        </Swiper>
      )}
    </Layout>
  )
}

export default Commercial
