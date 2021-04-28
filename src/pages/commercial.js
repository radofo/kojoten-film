import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
import MediaContainer from "../components/mediaContainer"
import CommercialBasicInfo from "../components/CommercialBasicInfo"
import Pending from "../components/pending"
import { ChevronRight, ChevronLeft } from "react-feather"
import { screenSizes } from "../styles/theme"

import { defaultLocale } from "../utils/fetch"

// 3rd Party
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.min.css"
import "../styles/swiper.css"
import CommercialOverview from "../components/commercial/CommercialOverview"

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
  @media ${({ theme }) => theme.screenSizes.desktop} {
    font-size: 2.5em;
  }
  z-index: 9999;
  position: absolute;
  left: ${props => {
    return props.left ? 0 : "initial"
  }};
  right: ${props => {
    return props.right ? 0 : "initial"
  }};
  top: 50%;
  transform: translateY(-50%);
  padding: var(--padding-sides);
`

const Commercial = ({ location }) => {
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

  const [overviewCommercials, setOverviewCommercials] = useState(null)
  const [commercials, setCommercials] = useState(null)
  const [swiperCommercials, setSwiperCommercials] = useState(null)
  const [vh, setVh] = useState("100vh")
  const [activeIndex, setActiveIndex] = useState(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    handleResize()

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
      .then(apidata => {
        const commercials = apidata.items
        const first = commercials.shift()
        const original = [first, ...commercials]
        const shifted = [...commercials, first] // workaround because Swiper starts with the last element
        const shiftedIndex = shifted.length - 1
        setCommercials(original)
        setOverviewCommercials(original.filter((comm, i) => i !== 0))
        setSwiperCommercials(shifted)
        setActiveIndex(shiftedIndex) // active index is for the shifted array, as updates to this are coming from Swiper
      })
  }, [locale])

  useEffect(() => {
    commercials &&
      setOverviewCommercials(
        commercials.filter(
          (comm, i) => i !== shiftArrayIndex(activeIndex, commercials)
        )
      )
  }, [activeIndex, commercials])

  const handleResize = () => {
    setVh(window.innerHeight || "100vh")
    setIsDesktop(window.innerWidth > screenSizes.desktop)
  }

  const shiftArrayIndex = (oldIndex, arr) => (oldIndex + 1) % arr.length

  return (
    <Layout locale={locale} changeLocale={changeLocale} transparentHeader>
      <Helmet>
        <title>Kojoten | Commercial</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      {swiperCommercials && swiperCommercials.length === 0 ? (
        <Pending emoji="🍿" subject="Commercials are" />
      ) : (
        <>
          <Swiper
            style={{ height: vh }}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            loop
            followFinger={false}
            speed={400}
            onSlideChangeTransitionEnd={swiper => {
              setActiveIndex(swiper.realIndex)
            }}
          >
            {swiperCommercials &&
              swiperCommercials.map((commercial, index) => {
                const commercialMedia = {
                  horizontalImage: {
                    src: commercial.fields.poster.fields.file.url,
                  },
                }
                return (
                  <SwiperSlide key={index}>
                    <MediaContainer
                      media={commercialMedia}
                      customLink={
                        commercial.fields.url
                          ? `/media/c/${commercial.fields.url}`
                          : undefined
                      }
                    ></MediaContainer>
                    <CommercialBasicInfo
                      locale={locale}
                      details={commercial.fields}
                    />
                  </SwiperSlide>
                )
              })}
            <NavButton className="swiper-prev" left>
              <ChevronLeft size={50} />
            </NavButton>
            <NavButton className="swiper-next" right>
              <ChevronRight size={50} />
            </NavButton>
          </Swiper>
          {overviewCommercials && (
            <CommercialOverview
              overviewCommercials={overviewCommercials}
              isDesktop={isDesktop}
            />
          )}
        </>
      )}
    </Layout>
  )
}

export default Commercial
