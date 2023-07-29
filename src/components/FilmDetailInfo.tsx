import React, { useContext } from "react"
import FilmDetailCredit from "./FilmDetailCredit"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"
import FilmShortDescription from "./FilmShortDescription"

import { IconRow } from "./IconRow"
import { t } from "../i18n/filmdetail"
import { LocaleContext } from "../context/LocaleContext"
import {
  FilmDetailCredits,
  FilmDetailDescription,
  FilmDetailInfoContainer,
  FilmDetailSynopsis,
  FilmDetailedInfos,
  IconRowHeadingStyle,
  IconRowWrapper,
} from "./FilmDetailInfoStyles"
import { Film } from "../contentful/film"

type FilmDetailInfoProps = {
  details: Film
  infosOpen: boolean
}

const FilmDetailInfo = ({ infosOpen, details }: FilmDetailInfoProps) => {
  const { locale } = useContext(LocaleContext)

  return (
    <FilmDetailInfoContainer infosOpen={infosOpen}>
      <FilmDetailSynopsis>
        <FilmShortDescription isColoredHeader={true} details={details} />
        <FilmDetailedInfos>
          <FilmDetailDescription>
            {documentToReactComponents(
              details.beschreibung?.[locale],
              renderOptions
            )}
          </FilmDetailDescription>
          {details.auszeichnungen?.length > 0 &&
            t.iconRows.auszeichnungen[locale] && (
              <IconRowWrapper>
                <IconRowHeadingStyle>
                  {t.iconRows.auszeichnungen[locale]}
                </IconRowHeadingStyle>
                <IconRow icons={details.auszeichnungen} alignment="left" />
              </IconRowWrapper>
            )}
          {details.koproduktionFrderungPartner.length > 0 &&
            t.iconRows.koproduktion?.[locale] && (
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
          {details.verleihVertrieb?.length > 0 &&
            t.iconRows.verleih[locale] && (
              <IconRowWrapper>
                <IconRowHeadingStyle>
                  {t.iconRows.verleih[locale]}
                </IconRowHeadingStyle>
                <IconRow icons={details.verleihVertrieb} alignment="left" />
              </IconRowWrapper>
            )}
          {details.festivals?.length > 0 && t.iconRows.festivals[locale] && (
            <IconRowWrapper>
              <IconRowHeadingStyle>
                {t.iconRows.festivals[locale]}
              </IconRowHeadingStyle>
              <IconRow icons={details.festivals} alignment="left" />
            </IconRowWrapper>
          )}
        </FilmDetailedInfos>
      </FilmDetailSynopsis>
      <FilmDetailCredits>
        {details.writers.length > 0 && (
          <FilmDetailCredit
            category={t.credits.autor[locale]}
            credits={details.writers}
          />
        )}
        {details.director.length > 0 && (
          <FilmDetailCredit
            category={t.credits.regisseur[locale]}
            credits={details.director}
          />
        )}
        {details.producer.length > 0 && (
          <FilmDetailCredit
            category={t.credits.producer[locale]}
            credits={details.producer}
          />
        )}
        {details.produzentin.length > 0 && (
          <FilmDetailCredit
            category={t.credits.produzent[locale]}
            credits={details.produzentin}
          />
        )}
        {details.koproduzentin.length > 0 && (
          <FilmDetailCredit
            category={t.credits.koproduzentin[locale]}
            credits={details.koproduzentin}
          />
        )}
        {details.cinematographer.length > 0 && (
          <FilmDetailCredit
            category={t.credits.kamera[locale]}
            credits={details.cinematographer}
          />
        )}
        {details.szenenbild.length > 0 && (
          <FilmDetailCredit
            category={t.credits.szenenbild[locale]}
            credits={details.szenenbild}
          />
        )}
        {details.kostm.length > 0 && (
          <FilmDetailCredit
            category={t.credits.kostum[locale]}
            credits={details.kostm}
          />
        )}
        {details.maske.length > 0 && (
          <FilmDetailCredit
            category={t.credits.maske[locale]}
            credits={details.maske}
          />
        )}
        {details.montage.length > 0 && (
          <FilmDetailCredit
            category={t.credits.montage[locale]}
            credits={details.montage}
          />
        )}
        {details.sounddesign.length > 0 && (
          <FilmDetailCredit
            category={t.credits.sounddesign[locale]}
            credits={details.sounddesign}
          />
        )}

        {details.filmmusik.length > 0 && (
          <FilmDetailCredit
            category={t.credits.filmmusik[locale]}
            credits={details.filmmusik}
          />
        )}
        {details.farbkorrektur.length > 0 && (
          <FilmDetailCredit
            category={t.credits.farbkorrektur[locale]}
            credits={details.farbkorrektur}
          />
        )}
        {details.casting.length > 0 && (
          <FilmDetailCredit
            category={t.credits.casting[locale]}
            credits={details.casting}
          />
        )}
        {details.cast.length > 0 && (
          <FilmDetailCredit
            category={t.credits.cast[locale]}
            credits={details.cast}
          />
        )}
      </FilmDetailCredits>
    </FilmDetailInfoContainer>
  )
}

export default FilmDetailInfo
