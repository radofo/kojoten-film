import React, { useState, useEffect, useRef } from "react"
import FilmPoster from "../components/filmPoster"
import styled, { keyframes } from "styled-components"
import { sliderSpeedFactor, getNodeListWidth } from "../utils/slider"

// Styled Components
const animateBatch = batchWidth => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-${batchWidth}px);
  }
`
const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  transform: translateX(0);
  animation: ${props => animateBatch(props.batchWidth)}
    ${props => {
      return props.batchWidth / sliderSpeedFactor
    }}s
    linear infinite;
  animation-fill-mode: forwards;
  animation-play-state: ${props => {
    return props.play ? "play" : "paused"
  }};
`

// React Component
const ImageSlider = ({ batch, batchWidth, overlayVisible }) => {
  const [play, setPlay] = useState(false)
  const [toggleCounter, _setToggleCounter] = useState(0)
  const [animationWidth, setAnimationWidth] = useState(batchWidth)
  const [sliderHeight, setSliderHeight] = useState(0)
  const counterRef = useRef(toggleCounter)
  const imageContainerRef = useRef(null)

  useEffect(() => {
    if (overlayVisible) {
      document.body.style.overflow = "hidden"
      setPlay(false)
    } else {
      document.body.style.overflow = ""
      setTimeout(() => {
        setPlay(true)
      }, 1000)
    }
  }, [overlayVisible])

  useEffect(() => {
    const imageContainerNode = imageContainerRef.current
    setSliderHeight(window.innerHeight)

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    window.setTimeout(function() {
      window.requestAnimationFrame(() => {
        const firstBatchNodes = Array.from(imageContainerNode.childNodes).slice(
          0,
          batch.length
        )
        const firstBatchWidth = getNodeListWidth(firstBatchNodes)
        const scrollStartPosition =
          firstBatchWidth !== 0 ? firstBatchWidth : batchWidth
        setAnimationWidth(scrollStartPosition)
        window.scrollTo(scrollStartPosition, 0)
      })
    }, 100)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [batch])

  const handleResize = event => {
    setSliderHeight(window.innerHeight)
    stopAnimation()
  }

  const handleScroll = event => {
    stopAnimation()
  }

  const stopAnimation = () => {
    setToggleCounter(counterRef.current + 1)
    if (counterRef.current > 1) {
      const hamburger = document.querySelector(".hamburger--squeeze")
      hamburger.focus()
      setPlay(false)
    }
  }

  const setToggleCounter = newValue => {
    counterRef.current = newValue
    _setToggleCounter(newValue)
  }

  return (
    <ImageContainer
      play={play}
      batchWidth={animationWidth}
      ref={imageContainerRef}
    >
      {batch.map((project, index) => {
        return (
          <FilmPoster
            posterHeight={sliderHeight}
            key={index}
            project={project}
            index={index}
          />
        )
      })}
      {batch.map((project, index) => {
        return (
          <FilmPoster
            posterHeight={sliderHeight}
            key={index}
            project={project}
            index={index}
          />
        )
      })}
      {batch.map((project, index) => {
        return (
          <FilmPoster
            posterHeight={sliderHeight}
            key={index}
            project={project}
            index={index}
          />
        )
      })}
    </ImageContainer>
  )
}

export default ImageSlider
