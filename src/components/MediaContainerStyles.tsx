import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

export const MediaContainerStyles = styled((props) => {
  return props.islink ? <Link {...props} /> : <div {...props} />
})`
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 9;
  cursor: ${(props) => (props.islink ? "url('/play.svg'), pointer" : "auto")};
`

export const Video = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
`

export const Image = styled.img<{ filters?: string }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  background: black;
  outline: 1px solid black;
  filter: ${(props) => props.filters};
`
export const Overlay = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0;

  div:hover,
  a:hover > & {
    opacity: 0.5;
  }
`
