import React, { useEffect, useState } from "react"
import styled from "styled-components"
import FilmBasicInfo from "./FilmBasicInfo"
import FilmDetailCredit from "./FilmDetailCredit"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"
import { createSrcSet } from "../utils/fetch"
import t from "../data/translations.json"

import { screenSizes } from "../utils/mediaqueries"

const FilmDetailInfoContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 20px var(--padding-sides) 0;
  margin: var(--header-height) 0 0;
  opacity: ${props => {
    return props.infosOpen ? "1" : "0"
  }};
  z-index: ${props => {
    return props.infosOpen ? "99" : "0"
  }};
  transition: all 0.45s ease-out;
  transform: ${props => {
    return props.infosOpen ? "translateY(0)" : "translateY(50px)"
  }};
  color: white;

  @media ${screenSizes.desktop} {
    display: flex;
    flex-direction: row;
  }
`

const FilmDetailedInfos = styled.div``
const FilmDetailDescription = styled.div`
  margin-top: 20px;
  color: var(--highlight-color);
`
const FilmDetailAward = styled.img`
  width: 75px;
  margin-right: 20px;
`
const FilmDetailAwardRow = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: row;
`

const FilmDetailLeft = styled.div`
  max-width: 100%;
  padding-right: 30px;
  @media ${screenSizes.desktop} {
    max-width: 70%;
  }
`

const FilmDetailCredits = styled.div`
  margin: 20px 0;
  @media ${screenSizes.desktop} {
    margin: 5px;
  }
  & > div:last-child {
    padding-bottom: 50px;
  }
`

const FilmDetailInfo = ({ infosOpen, details, locale }) => {
  return (
    <FilmDetailInfoContainer infosOpen={infosOpen}>
      <FilmDetailLeft>
        <FilmBasicInfo details={details} highlight />
        <FilmDetailedInfos>
          <FilmDetailDescription>
            {documentToReactComponents(details.beschreibung, renderOptions)}
          </FilmDetailDescription>
          <FilmDetailAwardRow>
            {details.auszeichnungen &&
              details.auszeichnungen.map((auszeichnung, index) => {
                const [awardSrc, awardSrcSet] = createSrcSet(
                  auszeichnung.fields.file.url,
                  "svg"
                )
                return (
                  <FilmDetailAward
                    key={index}
                    src={awardSrc}
                    srcSet={awardSrcSet}
                  />
                )
              })}
          </FilmDetailAwardRow>
        </FilmDetailedInfos>
      </FilmDetailLeft>
      <FilmDetailCredits>
        {details.writers && (
          <FilmDetailCredit
            category={t.filmDetail.autor[locale]}
            credits={details.writers}
          />
        )}
        {details.director && (
          <FilmDetailCredit
            category={t.filmDetail.regisseur[locale]}
            credits={details.director}
          />
        )}
        {details.producer && (
          <FilmDetailCredit
            category={t.filmDetail.producer[locale]}
            credits={details.producer}
          />
        )}
        {details.produzentin && (
          <FilmDetailCredit
            category={t.filmDetail.produzent[locale]}
            credits={details.produzentin}
          />
        )}
        {details.cinematographer && (
          <FilmDetailCredit
            category={t.filmDetail.kamera[locale]}
            credits={details.cinematographer}
          />
        )}
        {details.szenenbild && (
          <FilmDetailCredit
            category={t.filmDetail.szenenbild[locale]}
            credits={details.szenenbild}
          />
        )}
        {details.kostm && (
          <FilmDetailCredit
            category={t.filmDetail.kostum[locale]}
            credits={details.kostm}
          />
        )}
        {details.maske && (
          <FilmDetailCredit
            category={t.filmDetail.maske[locale]}
            credits={details.maske}
          />
        )}
        {details.maske && (
          <FilmDetailCredit
            category={t.filmDetail.maske[locale]}
            credits={details.maske}
          />
        )}
        {details.montage && (
          <FilmDetailCredit
            category={t.filmDetail.montage[locale]}
            credits={details.montage}
          />
        )}
        {details.sounddesign && (
          <FilmDetailCredit
            category={t.filmDetail.sounddesign[locale]}
            credits={details.sounddesign}
          />
        )}

        {details.filmmusik && (
          <FilmDetailCredit
            category={t.filmDetail.filmmusik[locale]}
            credits={details.filmmusik}
          />
        )}
        {details.farbkorrektur && (
          <FilmDetailCredit
            category={t.filmDetail.farbkorrektur[locale]}
            credits={details.farbkorrektur}
          />
        )}
        {details.cast && (
          <FilmDetailCredit
            category={t.filmDetail.cast[locale]}
            credits={details.cast}
          />
        )}
      </FilmDetailCredits>
    </FilmDetailInfoContainer>
  )
}

export default FilmDetailInfo
