import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"
import * as fetchContentful from "../utils/fetch"
import { defaultLocale } from "../utils/fetch"

import Layout from "../components/layout"

const PrivacyContainer = styled.div`
  padding: 0 var(--padding-sides);
  margin-top: calc(var(--header-height) + 50px);
  z-index: 9;
  position: relative;
  color: white;

  & > :first-child {
    margin-top: 0;
  }
`

const Privacy = ({ location }) => {
  // State
  const { state } = location
  const initialLocale = state && state.locale ? state.locale : defaultLocale
  const [locale, setLocale] = useState(initialLocale)
  const [datenschtzContent, setDatenschtzContent] = useState("")

  useEffect(() => {
    const storageLocale = localStorage.getItem("kojotenLanguage")
    if (storageLocale && initialLocale !== storageLocale) {
      setLocale(storageLocale)
    }
  }, [])

  useEffect(() => {
    fetchContentful
      .getAllEntries(
        { content_type: "datenschutz", locale: locale },
        window.location.host
      )
      .then(data => {
        if (data.items.length > 0) {
          const raw = data.items[0].fields.datenschutzText
          setDatenschtzContent(documentToReactComponents(raw, renderOptions))
        }
      })
  }, [locale])

  const changeLocale = newLocale => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  return (
    <Layout locale={locale} changeLocale={changeLocale}>
      <Helmet>
        <title>Kojoten | Privacy</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      <PrivacyContainer>{datenschtzContent}</PrivacyContainer>
    </Layout>
  )
}

export default Privacy
