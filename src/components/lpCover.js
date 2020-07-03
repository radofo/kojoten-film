import React from "react"
import styled from "styled-components"
import kojotenlogo from "../media/kojoten_logo.svg"

const VideoCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 999;
  transform: ${props => {
    return props.show ? "translateY(0)" : "translateY(-100%)"
  }};
  transition: transform 0.4s ease-out;
`

const ToggleButton = styled.button`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  border: none;

  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
`
const ChevronDown = styled.i`
  font-size: 30px;
  background: black;
  color: white;
`

const KojotenLogo = styled.img`
  position: absolute;
  bottom: 50px;
  left: 50px;
  width: 150px;
`

const LpCover = ({ overlayVisible, toggleOverlay }) => {
  return (
    <VideoCover show={overlayVisible}>
      <KojotenLogo src={kojotenlogo} alt="Kojoten Film" />
      <ToggleButton onClick={toggleOverlay}>
        <ChevronDown className="fas fa-chevron-down"></ChevronDown>
      </ToggleButton>
    </VideoCover>
  )
}

export default LpCover
