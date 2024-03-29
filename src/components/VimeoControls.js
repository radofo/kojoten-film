import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"

const VimeoControlsContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
  padding: 0 30px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const VideoSlider = styled.div`
  max-width: 800px;
  flex-grow: 1;
  padding: 10px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`

const VideoBar = styled.div`
  height: 4px;
  width: 100%;
  background: white;
  position: absolute;
  top: 50%;
  left: 0;
  border-radius: 5px;

  transform: translateY(-50%);
  z-index: 9;
`

const VideoProgress = styled.div`
  width: ${(props) => {
    return props.progress
  }}%;
  height: 4px;
  background-color: #ffd600;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 99;
  border-radius: 5px;
  transition: width 0.5s linear;
`

const Play = styled.i`
  color: white;
  z-index: 999;
  &:hover {
    cursor: pointer;
  }
`
const Expand = styled.i`
  color: white;
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`

const Volume = styled.i`
  color: white;
  font-size: 18px;
  margin-right: 20px;
  margin-left: 20px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`

const VolumeBar = styled.div`
  position: absolute;
  height: 50px;
  width: 5px;
  background: white;
  border-radius: 5px;
  top: 0;
  left: 50%;
  transform: translate(-50%, -110%);
  display: none;
`

const VimeoControls = ({ player }) => {
  const [playtime, setPlaytime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const sliderRef = useRef(null)

  useEffect(() => {
    if (player) {
      player.on("timeupdate", function (time) {
        const newTime = Math.round(time.percent * 100)
        setPlaytime(newTime)
      })
      player.on("play", function (time) {
        setIsPlaying(true)
        player
          .getDuration()
          .then(function (d) {
            setDuration(d)
          })
          .catch(function (error) {})
      })
      player.on("pause", function (time) {
        setIsPlaying(false)
      })
      player.setVolume(volume)
    }
  }, [player])

  const changeProgress = (event) => {
    const sliderStart = sliderRef.current.offsetLeft
    const sliderWidth = sliderRef.current.offsetWidth
    const clickPosition = event.clientX - sliderStart
    const newPercentage = clickPosition / sliderWidth
    const newPosition = newPercentage * duration
    const newTime = Math.round(newPercentage * 100)
    setPlaytime(newTime)
    player
      .setCurrentTime(newPosition)
      .then(function (seconds) {})
      .catch(function (error) {
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

  const togglePlay = () => {
    player
      .getPaused()
      .then(function (paused) {
        if (paused) {
          player.play()
        } else {
          player.pause()
        }
      })
      .catch(function (error) {
        // an error occurred
      })
  }

  const toggleFullscreen = () => {
    player
      .requestFullscreen()
      .then(function () {
        // the player entered fullscreen
      })
      .catch(function (error) {
        // an error occurred
      })
  }

  const toggleVolume = () => {
    const newVolume = volume > 0 ? 0 : 0.5
    setVolume(newVolume)
    player.setVolume(newVolume)
  }

  return (
    <VimeoControlsContainer>
      <Play
        onClick={togglePlay}
        className={`fas fa-${isPlaying ? "pause" : "play"}`}
      ></Play>
      <Volume
        onClick={toggleVolume}
        className={`fas fa-${volume > 0 ? "volume-up" : "volume-mute"}`}
      >
        <VolumeBar></VolumeBar>
      </Volume>
      <VideoSlider ref={sliderRef} onClick={changeProgress}>
        <VideoBar />
        <VideoProgress progress={playtime}></VideoProgress>
      </VideoSlider>
      <Expand onClick={toggleFullscreen} className={`fas fa-expand`} />
    </VimeoControlsContainer>
  )
}

export default VimeoControls
