import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as fetchContentful from "../utils/fetch"
import styled from "styled-components"
import MediaContainer from "../components/mediaContainer"
import { screenSizes } from "../utils/mediaqueries"
import { defaultLocale } from "../utils/fetch"
import Pending from "../components/pending"

const TeamContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`

const TeamDescription = styled.p`
  position: absolute;
  color: var(--highlight-color);
  font-weight: normal;
  top: 0;
  left: 0;
  padding: calc(var(--header-height) * 1.5) calc(var(--padding-sides) * 1)
    calc(var(--padding-sides) * 1);
  max-width: 100%;
  @media ${screenSizes.tablet} {
    padding: 0 0 calc(var(--padding-sides) * 1) calc(var(--padding-sides) * 1);
    bottom: 0;
    top: initial;
    max-width: 50%;
  }
`

const Team = () => {
  const [team, setTeam] = useState(null)
  const [teamMedia, setTeamMedia] = useState({})
  const [isComingSoon, setIsComingSoon] = useState(false)

  useEffect(() => {
    fetchContentful
      .getAllEntries({ content_type: "team", locale: defaultLocale })
      .then(apidata => {
        if (apidata.items.length > 0) {
          setTeam(apidata.items[0].fields)
          setTeamMedia({
            horizontalImage: {
              src: apidata.items[0].fields.backgroundImage.fields.file.url,
            },
          })
        } else {
          setIsComingSoon(true)
        }
      })
  }, [])

  return (
    <Layout transparentHeader>
      <Helmet>
        <title>Kojoten | Team</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {isComingSoon ? (
        <Pending emoji="🐺" subject="Team Information is" />
      ) : (
        <TeamContainer>
          <MediaContainer media={teamMedia}>
            <TeamDescription>{team && team.description}</TeamDescription>
          </MediaContainer>
        </TeamContainer>
      )}
    </Layout>
  )
}

export default Team
