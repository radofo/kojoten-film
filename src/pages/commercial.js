import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import * as fetchContentful from "../utils/fetch"
import MediaContainer from "../components/mediaContainer"
import CommercialBasicInfo from "../components/CommercialBasicInfo"
import Pending from "../components/pending"
import { ChevronRight, ChevronLeft, ChevronDown } from "react-feather"
import { screenSizes } from "../styles/theme"
import { NavButton, ScrollButton } from "../styles/pageStyles/commercialStyles"

import { defaultLocale } from "../utils/fetch"

// 3rd Party
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "../styles/swiper.css"
import CommercialOverview from "../components/commercial/CommercialOverview"
import { useRef } from "react"

const Commercial = ({ location }) => {
  const { state } = location
  const initialLocale = state && state.locale ? state.locale : defaultLocale
  const [locale, setLocale] = useState(initialLocale)
  const [commercials, setCommercials] = useState(null)
  const [vh, setVh] = useState("100vh")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const overviewRef = useRef(null)

  useEffect(() => {
    // Locale
    const storageLocale = localStorage.getItem("kojotenLanguage")
    if (storageLocale && initialLocale !== storageLocale) {
      setLocale(storageLocale)
    }
    // Resize
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
      .then((apidata) => {
        const validCommercials = filterInvalidCommercials(apidata.items)
        setCommercials(validCommercials)
      })
  }, [locale])

  const filterInvalidCommercials = (allCommercials) => {
    return allCommercials.filter((comm) => comm?.fields?.poster !== undefined)
  }

  const changeLocale = (newLocale) => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  const handleResize = () => {
    setVh(window.innerHeight || "100vh")
    setIsDesktop(window.innerWidth > screenSizes.desktop)
  }

  const isCommercialsInProgress = commercials && commercials.length === 0
  const showCommercials = !isCommercialsInProgress && commercials

  return (
    <Layout locale={locale} changeLocale={changeLocale} transparentHeader>
      <Helmet>
        <title>Kojoten | Commercial</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      {isCommercialsInProgress && (
        <Pending emoji="🍿" subject="Commercials are" />
      )}
      {showCommercials && (
        <>
          <Swiper
            modules={[Navigation]}
            style={{ height: vh }}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            loop
            followFinger={false}
            speed={400}
            onSlideChangeTransitionEnd={(swiper) => {
              setActiveIndex(swiper.realIndex)
            }}
          >
            {commercials.map((commercial, index) => {
              const commercialMedia = {
                image: {
                  src: commercial.fields.poster.fields.file.url,
                },
              }
              return (
                <SwiperSlide
                  key={`${commercial?.fields?.name}${commercial?.fields?.position}${index}`}
                >
                  <MediaContainer
                    media={commercialMedia}
                    playbackLink={
                      commercial.fields.url
                        ? `/media/c/${commercial.fields.url}`
                        : undefined
                    }
                  />
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
            <ScrollButton
              onClick={() =>
                overviewRef?.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              <ChevronDown size={50} />
            </ScrollButton>
          </Swiper>
          <CommercialOverview
            activeIndex={activeIndex}
            overviewRef={overviewRef}
            overviewCommercials={commercials}
            isDesktop={isDesktop}
          />
        </>
      )}
    </Layout>
  )
}

export default Commercial
