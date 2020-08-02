import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"

const VimeoControlsContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  color: white;
`

const VideoSlider = styled.div`
  width: 50%;
  height: 3px;
  background: white;
  &:hover {
    height: 4px;
    cursor: pointer;
  }
  &:hover > * {
    height: 4px;
  }
  transition: height 0.5s ease-out;
`

const VideoProgress = styled.div`
  width: ${props => {
    return props.progress
  }}%;
  height: 3px;
  background-color: #ffd600;
  transition: width 0.3s ease-out, height 0.5s ease-out;
`

const VimeoControls = ({ player }) => {
  const [playtime, setPlaytime] = useState(0)
  const [duration, setDuration] = useState(0)
  const sliderRef = useRef(null)
  useEffect(() => {
    if (player) {
      player.on("timeupdate", function(time) {
        const newTime = Math.round(time.percent * 100)
        setPlaytime(newTime)
      })
      player.on("play", function(time) {
        player
          .getDuration()
          .then(function(d) {
            setDuration(d)
          })
          .catch(function(error) {})
      })
    }
  }, [player])

  const changeProgress = event => {
    const sliderStart = sliderRef.current.offsetLeft
    const sliderWidth = sliderRef.current.offsetWidth
    const clickPosition = event.clientX - sliderStart
    const newPercentage = clickPosition / sliderWidth
    const newPosition = newPercentage * duration
    const newTime = Math.round(newPercentage * 100)
    setPlaytime(newTime)
    player
      .setCurrentTime(newPosition)
      .then(function(seconds) {})
      .catch(function(error) {
        switch (error.name) {
          case "RangeError":
            console.log("Range error")
            break

          default:
            console.log("Slider Error")
            break
        }
      })
  }
  return (
    <VimeoControlsContainer>
      <VideoSlider ref={sliderRef} onClick={changeProgress}>
        <VideoProgress progress={playtime}></VideoProgress>
      </VideoSlider>
    </VimeoControlsContainer>
  )
}

export default VimeoControls
