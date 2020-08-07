import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
import { Link } from "gatsby"
import MediaContainer from "../components/mediaContainer"

import { defaultLocale } from "../utils/fetch"

// 3rd Party
import SwiperCore, { Navigation, Mousewheel, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.min.css"
import "../styles/swiper.css"

SwiperCore.use([Navigation, Autoplay, Mousewheel])

const PlayButton = styled.i`
  font-size: 80px;
  color: rgba(255, 255, 255, 0.3);
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
  }
`

const NavButton = styled.button`
  color: rgba(255, 255, 255, 0.3);
  outline: none;
  font-size: 3em;
  background: rgba(0, 0, 0, 0);
  border: 0px solid rgba(0, 0, 0, 0);
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
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
  const [slideSpeed, setSlideSpeed] = useState(0)
  const [commercials, setCommercials] = useState(null)
  const [vh, setVh] = useState("100vh")

  useEffect(() => {
    setVh(`${window.innerHeight}px` || "100vh")
    fetchContentful
      .getAllEntries({ content_type: "commercial", locale: defaultLocale })
      .then(apidata => {
        setCommercials(apidata)
      })
  }, [])

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
                <div
                  style={{
                    position: "absolute",
                    bottom: "50px",
                    left: "100px",
                  }}
                >
                  {commercial.fields.name}
                </div>
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
