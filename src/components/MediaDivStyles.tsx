import { Link } from "gatsby"
import React from "react"
import styled, { css } from "styled-components"

export const BackgroundMediaContainer = styled((props) => {
  return props.cursorPlayButton ? <Link {...props} /> : <div {...props} />
})`
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  cursor: ${(props) =>
    props.cursorPlayButton
      ? "url('/play.svg'), pointer"
      : props.to
      ? "pointer"
      : "auto"};
  ${(props) => {
    if (props.zoomImageOnHover) {
      return css`
        &:hover img {
          transform: scale(1.1);
        }
      `
    }
  }};
`

export const BackgroundMediaContent = styled.div<{
  layer?: number
  roundedCorners?: boolean
}>`
  position: absolute;
  ${({ roundedCorners }) => (roundedCorners ? "border-radius: 14px;" : "")};
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ layer }) => layer ?? "initial"};
`

export const Video = styled.video<{ filters?: string }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  filter: ${(props) => props.filters};
`

export const Image = styled.img<{ filters?: string; imgOpacity?: number }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transform: scale(1);
  background: black;
  opacity: ${({ imgOpacity }) => imgOpacity ?? 1};
  outline: 1px solid black;
  filter: ${(props) => props.filters};
  transition: transform 0.1s ease-out, opacity 0.2s ease-out;
`
