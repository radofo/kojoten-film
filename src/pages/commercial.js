import React, { useEffect, useState } from "react"
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

const Commercial = ({ data }) => {
  const [commercials, setCommercials] = useState(null)
  const [vh, setVh] = useState("100vh")

  useEffect(() => {
    setVh(window.innerHeight || "100vh")
    fetchContentful
      .getAllEntries({ content_type: "commercial", locale: defaultLocale })
      .then(apidata => {
        setCommercials(apidata)
      })
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleResize = () => {
    setVh(window.innerHeight || "100vh")
  }

  return (
    <Layout transparentHeader>
      <Swiper
        onSlideChange={swiper => console.log(swiper.activeIndex)}
        onSwiper={swiper => console.log(swiper)}
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
            console.log("commercial: ", commercial)
            const commercialMedia = {
              horizontalImage: {
                src: commercial.fields.poster.fields.file.url,
              },
            }
            return (
              <SwiperSlide key={index}>
                <MediaContainer media={commercialMedia}></MediaContainer>
                <CommercialBasicInfo details={commercial.fields} />
                <NavRow>
                  <NavButton>
                    <i className="fa fa-chevron-left swiper-prev"></i>
                  </NavButton>
                  <Link to={`/media/${commercial.fields.url}`}>
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
    </Layout>
  )
}

export default Commercial
