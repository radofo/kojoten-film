import React, { useState, useEffect, useRef } from "react"
import FilmPoster from "../components/filmPoster"
import styled, { keyframes } from "styled-components"
import { sliderSpeedFactor } from "../utils/slider"

const ViewPortContainer = styled.div`
  width: 100vw;
  overflow-y: hidden;
  overflow-x: scroll;
`

const animateBatch = batchWidth => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-${batchWidth}px);
  }
`

const ImageContainer = styled.div`
  padding-top: var(--header-height);
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  animation: ${props => animateBatch(props.batchWidth)}
    ${props => props.batchWidth / sliderSpeedFactor}s linear infinite;
  animation-fill-mode: forwards;
  animation-play-state: ${props => {
    return props.play ? "play" : "paused"
  }};
  transform: translateX(0);
`

const ImageSlider = ({ batch, batchWidth }) => {
  const [play, setPlay] = useState(true)
  const [toggleCounter, _setToggleCounter] = useState(0)

  // Refs
  const counterRef = useRef(toggleCounter)
  const viewPortRef = useRef(null)

  // Hooks
  useEffect(() => {
    const currentRef = viewPortRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", stopAnimation)
      window.addEventListener("resize", stopAnimation)
      currentRef.scrollLeft = batchWidth
    }
    return () => {
      currentRef.removeEventListener("scroll", stopAnimation)
      window.removeEventListener("resize", stopAnimation)
    }
  }, [])

  // Methods
  const setToggleCounter = newValue => {
    counterRef.current = newValue
    _setToggleCounter(newValue)
  }

  const stopAnimation = event => {
    console.log("event: ", event)
    setToggleCounter(counterRef.current + 1)
    if (counterRef.current > 1) {
      setPlay(false)
    }
  }

  // Render
  return (
    <ViewPortContainer ref={viewPortRef}>
      <ImageContainer play={play} batchWidth={batchWidth}>
        {batch.map((edge, index) => {
          return <FilmPoster key={index} node={edge.node} index={index} />
        })}
        {batch.map((edge, index) => {
          return <FilmPoster key={index + 50} node={edge.node} index={index} />
        })}
        {batch.map((edge, index) => {
          return <FilmPoster key={index + 100} node={edge.node} index={index} />
        })}
      </ImageContainer>
    </ViewPortContainer>
  )
}

export default ImageSlider
