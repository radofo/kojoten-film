import React from "react"
import { ChevronDown, X } from "react-feather"
import styled, { css } from "styled-components"

export const FilmDetailContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background: black;
`

export const FilmDetailFeatherIcon = css`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  color: white;
  &:hover {
    cursor: pointer;
  }
`
export const FeatherChevronDown = styled((props) => <ChevronDown {...props} />)`
  ${FilmDetailFeatherIcon}
`
export const FeatherX = styled((props) => <X {...props} />)`
  ${FilmDetailFeatherIcon}
`

export const FilmDetailOverlay = styled.div<{ infosOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => {
    return props.infosOpen ? "block" : "none"
  }};
  top: 0;
  left: 0;
`
