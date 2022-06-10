import React from "react"
import styled from "styled-components"
import FilmDetailCredit from "./FilmDetailCredit"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"
import FilmShortDescription from "./reusable/FilmShortDescription"

import { IconRow } from "./IconRow"
import { t } from "./locales/filmdetail"

const FilmDetailInfoContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 20px ${({ theme }) => theme.spacing.pageSides} 100px;
  margin: ${(props) => props.theme.spacing.headerHeight} 0 0;
  opacity: ${(props) => {
    return props.infosOpen ? "1" : "0"
  }};
  visibility: ${(props) => {
    return props.infosOpen ? "visible" : "hidden"
  }};
  z-index: ${(props) => {
    return props.infosOpen ? "99" : "0"
  }};
  transition: all 0.45s ease-out;
  transform: ${(props) => {
    return props.infosOpen ? "translateY(0)" : "translateY(50px)"
  }};
  color: white;

  @media ${({ theme }) => theme.screenSizes.desktop} {
    display: flex;
    flex-direction: row;
  }
`

const FilmDetailSynopsis = styled.div`
  max-width: 100%;
  padding-right: 60px;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    flex-grow: 0;
    flex-basis: 50%;
    & > div:last-child {
      padding-bottom: 50px;
    }
  }
`

const FilmDetailCredits = styled.div`
  margin: 20px 0;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    padding-left: 60px;
    margin: 0;
    padding-top: 10px;
    flex-grow: 0;
    flex-basis: 50%;
  }
  & > div:last-child {
    padding-bottom: 50px;
  }
`

const IconRowWrapper = styled.div`
  margin: 30px 0;
`

const IconRowHeadingStyle = styled.h4`
  font-weight: bold;
  margin-bottom: 15px;
`

const FilmDetailedInfos = styled.div``

const FilmDetailDescription = styled.div`
  margin-top: 20px;
`

const FilmDetailInfo = ({ infosOpen, details, locale }) => {
  return (
    <FilmDetailInfoContainer infosOpen={infosOpen}>
      <FilmDetailSynopsis>
        <FilmShortDescription isColoredHeader={true} details={details} />
        <FilmDetailedInfos>
          <FilmDetailDescription>
            {documentToReactComponents(details.beschreibung, renderOptions)}
          </FilmDetailDescription>
          {details.auszeichnungen && t.iconRows.auszeichnungen[locale] && (
            <IconRowWrapper>
              <IconRowHeadingStyle>
                {t.iconRows.auszeichnungen[locale]}
              </IconRowHeadingStyle>
              <IconRow icons={details.auszeichnungen} alignment="left" />
            </IconRowWrapper>
          )}
          {details.koproduktionFrderungPartner &&
            t.iconRows.koproduktion[locale] && (
              <IconRowWrapper>
                <IconRowHeadingStyle>
                  {t.iconRows.koproduktion[locale]}
                </IconRowHeadingStyle>
                <IconRow
                  icons={details.koproduktionFrderungPartner}
                  alignment="left"
                />
              </IconRowWrapper>
            )}
        </FilmDetailedInfos>
      </FilmDetailSynopsis>
      <FilmDetailCredits>
        {details.writers && (
          <FilmDetailCredit
            category={t.credits.autor[locale]}
            credits={details.writers}
          />
        )}
        {details.director && (
          <FilmDetailCredit
            category={t.credits.regisseur[locale]}
            credits={details.director}
          />
        )}
        {details.producer && (
          <FilmDetailCredit
            category={t.credits.producer[locale]}
            credits={details.producer}
          />
        )}
        {details.produzentin && (
          <FilmDetailCredit
            category={t.credits.produzent[locale]}
            credits={details.produzentin}
          />
        )}
        {details.cinematographer && (
          <FilmDetailCredit
            category={t.credits.kamera[locale]}
            credits={details.cinematographer}
          />
        )}
        {details.szenenbild && (
          <FilmDetailCredit
            category={t.credits.szenenbild[locale]}
            credits={details.szenenbild}
          />
        )}
        {details.kostm && (
          <FilmDetailCredit
            category={t.credits.kostum[locale]}
            credits={details.kostm}
          />
        )}
        {details.maske && (
          <FilmDetailCredit
            category={t.credits.maske[locale]}
            credits={details.maske}
          />
        )}
        {details.montage && (
          <FilmDetailCredit
            category={t.credits.montage[locale]}
            credits={details.montage}
          />
        )}
        {details.sounddesign && (
          <FilmDetailCredit
            category={t.credits.sounddesign[locale]}
            credits={details.sounddesign}
          />
        )}

        {details.filmmusik && (
          <FilmDetailCredit
            category={t.credits.filmmusik[locale]}
            credits={details.filmmusik}
          />
        )}
        {details.farbkorrektur && (
          <FilmDetailCredit
            category={t.credits.farbkorrektur[locale]}
            credits={details.farbkorrektur}
          />
        )}
        {details.cast && (
          <FilmDetailCredit
            category={t.credits.cast[locale]}
            credits={details.cast}
          />
        )}
        {details.casting && (
          <FilmDetailCredit
            category={t.credits.casting[locale]}
            credits={details.casting}
          />
        )}
      </FilmDetailCredits>
    </FilmDetailInfoContainer>
  )
}

export default FilmDetailInfo
