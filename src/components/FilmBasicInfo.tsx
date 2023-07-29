import React from "react"
import styled from "styled-components"
import FilmShortDescription from "./FilmShortDescription"
import { Film } from "../contentful/film"

const FilmBasicInfoContainer = styled.div<{ infosOpen: boolean }>`
  position: absolute;
  left: 0;
  bottom: 10px;
  padding: 0 calc(${({ theme }) => theme.spacing.pageSides} + 10px) 50px;
  opacity: ${(props) => {
    return props.infosOpen ? "0" : "1"
  }};

  transition: all 0.25s ease-out;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    bottom: 30px;
  }
`

type FilmBasicInfoProps = {
  details: Film
  infosOpen: boolean
}

const FilmBasicInfo = ({ details, infosOpen }: FilmBasicInfoProps) => {
  return (
    <FilmBasicInfoContainer infosOpen={infosOpen}>
      <FilmShortDescription isColoredHeader={false} details={details} />
    </FilmBasicInfoContainer>
  )
}

export default FilmBasicInfo
