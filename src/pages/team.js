import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
import MediaContainer from "../components/mediaContainer"
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
  overflow-y: scroll;
  z-index: 9;
`

const TeamDescription = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.colors.normal};
  background: rgba(37, 37, 37, 0.4);
  line-height: 1.3;
  border-radius: 10px;
  font-weight: normal;
  padding: 15px;
  bottom: 0;
  left: 0;
  margin: calc(${(props) => props.theme.spacing.headerHeight} * 1.5)
    calc(${({ theme }) => theme.spacing.pageSides} * 1)
    calc(${({ theme }) => theme.spacing.pageSides} * 1);
  max-width: 100%;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    margin: 0 0 calc(${({ theme }) => theme.spacing.pageSides} * 1)
      calc(${({ theme }) => theme.spacing.pageSides} * 1);
    bottom: 0;
    top: initial;
    max-width: 50%;
  }
`

const Team = ({ location }) => {
  const { state } = location
  const initialLocale = state && state.locale ? state.locale : defaultLocale
  const [locale, setLocale] = useState(initialLocale)
  const [isComingSoon, setIsComingSoon] = useState(false)
  const [teamDescription, setTeamDescription] = useState("")
  const [teamMedia, setTeamMedia] = useState({})

  useEffect(() => {
    const storageLocale = localStorage.getItem("kojotenLanguage")
    if (storageLocale && initialLocale !== storageLocale) {
      setLocale(storageLocale)
    }
  }, [])

  useEffect(() => {
    fetchContentful
      .getAllEntries(
        { content_type: "team", locale: locale },
        window.location.host
      )
      .then((apidata) => {
        if (apidata.items.length > 0) {
          const raw = apidata?.items[0]?.fields?.teamBeschreibungsText
          setTeamDescription(documentToReactComponents(raw, renderOptions))
          setTeamMedia({
            image: {
              src: apidata?.items[0]?.fields?.backgroundImage?.fields?.file
                ?.url,
              srcMobile:
                apidata?.items[0]?.fields?.hintergrundbildMobile?.fields?.file
                  ?.url,
            },
          })
        } else {
          setIsComingSoon(true)
        }
      })
  }, [locale])

  const changeLocale = (newLocale) => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  return (
    <Layout transparentHeader locale={locale} changeLocale={changeLocale}>
      <Helmet>
        <title>Kojoten | Team</title>
        <meta name="description" content="Kojoten Film" />
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
