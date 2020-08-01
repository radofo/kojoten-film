import React from "react"
import styled from "styled-components"

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
  padding: calc(var(--header-height) + 20px) calc(var(--padding-sides) + 20px);
  margin-bottom: 20px;
  opacity: ${props => {
    return props.infosOpen ? "0" : "1"
  }};
  }
  transition: all .25s ease-out;
`

const FilmDetailCover = ({ details, infosOpen }) => {
  return (
    <FilmDetailCoverContainer infosOpen={infosOpen}>
      <FilmBasicInfo details={details} />
    </FilmDetailCoverContainer>
  )
}

export default FilmDetailCover
