import React from "react"
import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"
import FilmShortDescription from "./reusable/FilmShortDescription"

const FilmBasicInfoContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 10px;
  padding: 0 calc(var(--padding-sides) + 10px) 50px;
  opacity: ${props => {
    return props.infosOpen ? "0" : "1"
  }};

  transition: all 0.25s ease-out;
  @media ${screenSizes.desktop} {
    bottom: 30px;
  }
`

const FilmBasicInfo = ({ details, infosOpen }) => {
  return (
    <FilmBasicInfoContainer infosOpen={infosOpen}>
      <FilmShortDescription isColoredHeader={false} details={details} />
    </FilmBasicInfoContainer>
  )
}

export default FilmBasicInfo
