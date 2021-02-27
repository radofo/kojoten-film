import React from "react"
import styled from "styled-components"

const MediaContainerPlay = styled.svg`
  opacity: 0.6;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.1s ease-in;
`

export const PlayButton = ({ size }) => {
  return (
    <MediaContainerPlay
      width={size}
      height={size}
      viewBox="0 0 63 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60.8354 37.1455C63.2636 38.7227 63.2636 42.2773 60.8354 43.8545L6.17882 79.355C3.51774 81.0834 -3.69549e-06 79.1736 -3.69549e-06 76.0005V4.99952C-3.69549e-06 1.82637 3.51773 -0.0834209 6.17882 1.645L60.8354 37.1455Z"
        fill="#E7E7E7"
      />
    </MediaContainerPlay>
  )
}
