import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import FilmBasicInfo from "./FilmBasicInfo"

const FilmDetailCoverContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  color: white;
  padding: calc(var(--header-height) + 20px) var(--padding-sides);
  margin-bottom: 20px;
  opacity: ${props => {
    return props.infosOpen ? "0" : "1"
  }};
  transition: all 0.25s ease-out;
`

const PlayButton = styled.i`
  font-size: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
  }
`

const FilmDetailCover = ({ details, infosOpen }) => {
  return (
    <FilmDetailCoverContainer infosOpen={infosOpen}>
      <FilmBasicInfo details={details} />
      <Link to={`/media/${details.url}`}>
        <PlayButton className={`far fa-play-circle`}></PlayButton>
      </Link>
    </FilmDetailCoverContainer>
  )
}

export default FilmDetailCover
