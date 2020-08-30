import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
import MediaContainer from "../components/mediaContainer"
import { screenSizes } from "../utils/mediaqueries"
import { defaultLocale } from "../utils/fetch"
import Pending from "../components/pending"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"

const TeamContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`

const TeamDescription = styled.div`
  position: absolute;
  color: var(--highlight-color);
  font-weight: normal;
  top: 0;
  left: 0;
  padding: calc(var(--header-height) * 1.5) calc(var(--padding-sides) * 1)
    calc(var(--padding-sides) * 1);
  max-width: 100%;
  @media ${screenSizes.desktop} {
    padding: 0 0 calc(var(--padding-sides) * 1) calc(var(--padding-sides) * 1);
    bottom: 0;
    top: initial;
    max-width: 50%;
  }
`

const Team = ({ location }) => {
  // Locales ===================================
  const { state } = location
  const initialLocale = state ? state.locale : defaultLocale
  const [locale, setLocale] = useState(initialLocale)
  useEffect(() => {
    const storageLocale = localStorage.getItem("kojotenLanguage")
    if (storageLocale && initialLocale !== storageLocale) {
      setLocale(storageLocale)
    }
  }, [])

  const changeLocale = newLocale => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  // Data ======================================
  const [teamDescription, setTeamDescription] = useState("")
  const [teamMedia, setTeamMedia] = useState({})
  useEffect(() => {
    fetchContentful
      .getAllEntries(
        { content_type: "team", locale: locale },
        window.location.host
      )
      .then(apidata => {
        mapContentfulData(apidata)
      })
  }, [locale])
  const mapContentfulData = apidata => {
    if (apidata.items.length > 0) {
      const raw = apidata.items[0].fields.teamBeschreibungsText
      setTeamDescription(documentToReactComponents(raw, renderOptions))
      setTeamMedia({
        horizontalImage: {
          src: apidata.items[0].fields.backgroundImage.fields.file.url,
        },
      })
    } else {
      setIsComingSoon(true)
    }
  }

  // Misc ======================================
  const [isComingSoon, setIsComingSoon] = useState(false)

  return (
    <Layout transparentHeader locale={locale} changeLocale={changeLocale}>
      <Helmet>
        <title>Kojoten | Team</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {isComingSoon ? (
        <Pending emoji="🐺" subject="Team Information is" />
      ) : (
        <TeamContainer>
          <MediaContainer media={teamMedia}>
            <TeamDescription>{teamDescription}</TeamDescription>
          </MediaContainer>
        </TeamContainer>
      )}
    </Layout>
  )
}

export default Team
