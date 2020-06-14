import React, { useState, useEffect, useRef } from "react"
import FilmPoster from "../components/filmPoster"
import styled, { keyframes } from "styled-components"
import { sliderSpeedFactor } from "../utils/slider"

// Styled Components
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
    ${props => {
      return props.batchWidth / sliderSpeedFactor
    }}s
    linear infinite;
  animation-fill-mode: forwards;
  animation-play-state: ${props => {
    return props.play ? "play" : "paused"
  }};
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateX(0);
`
const BatchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

// React Component
const ImageSlider = ({ batch, batchWidth }) => {
  const [play, setPlay] = useState(false)
  const [toggleCounter, _setToggleCounter] = useState(0)
  const [animationWidth, setAnimationWidth] = useState(batchWidth)
  const counterRef = useRef(toggleCounter)
  const viewPortRef = useRef(null)
  const firstBatchRef = useRef(null)

  useEffect(() => {
    const viewportNode = viewPortRef.current
    const firstBatchNode = firstBatchRef.current
    if (viewportNode && firstBatchNode) {
      window.setTimeout(function() {
        window.requestAnimationFrame(() => {
          viewportNode.addEventListener("scroll", stopAnimation)
          window.addEventListener("resize", stopAnimation)
          const scrollStartPosition =
            firstBatchNode.offsetWidth !== 0
              ? firstBatchNode.offsetWidth
              : batchWidth
          setAnimationWidth(scrollStartPosition)
          setPlay(true)
          viewportNode.scrollLeft = scrollStartPosition
        })
      }, 100)
    }
    return () => {
      viewportNode.removeEventListener("scroll", stopAnimation)
      window.removeEventListener("resize", stopAnimation)
    }
  }, [])

  const setToggleCounter = newValue => {
    counterRef.current = newValue
    _setToggleCounter(newValue)
  }

  const stopAnimation = event => {
    setToggleCounter(counterRef.current + 1)
    if (counterRef.current > 1) {
      setPlay(false)
    }
  }

  return (
    <ViewPortContainer ref={viewPortRef}>
      <ImageContainer play={play} batchWidth={animationWidth}>
        <BatchContainer ref={firstBatchRef}>
          {batch.map((edge, index) => {
            return (
              <FilmPoster
                firstBatch={true}
                key={index}
                node={edge.node}
                index={index}
              />
            )
          })}
        </BatchContainer>
        <BatchContainer>
          {batch.map((edge, index) => {
            return (
              <FilmPoster key={index + 50} node={edge.node} index={index} />
            )
          })}
        </BatchContainer>
        <BatchContainer>
          {batch.map((edge, index) => {
            return (
              <FilmPoster key={index + 100} node={edge.node} index={index} />
            )
          })}
        </BatchContainer>
      </ImageContainer>
    </ViewPortContainer>
  )
}

export default ImageSlider
