import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"
import * as fetchContentful from "../utils/fetch"
import { defaultLocale } from "../utils/fetch"

import Layout from "../components/Layout"
import { LocaleContext } from "../context/LocaleContext"

const PrivacyContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.pageSides};
  margin-top: calc(${(props) => props.theme.spacing.headerHeight} + 50px);
  z-index: 9;
  position: relative;
  color: white;

  & > :first-child {
    margin-top: 0;
  }
`

const Privacy = () => {
  const { locale } = useContext(LocaleContext)
  const [datenschtzContent, setDatenschtzContent] = useState("")

  useEffect(() => {
    fetchContentful
      .getAllEntries(
        { content_type: "datenschutz", locale: locale },
        window.location.host
      )
      .then((data) => {
        if (data.items.length > 0) {
          const raw = data.items[0].fields.datenschutzText
          setDatenschtzContent(documentToReactComponents(raw, renderOptions))
        }
      })
  }, [locale])

  return (
    <Layout>
      <Helmet>
        <title>Kojoten | Privacy</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      <PrivacyContainer>{datenschtzContent}</PrivacyContainer>
    </Layout>
  )
}

export default Privacy
