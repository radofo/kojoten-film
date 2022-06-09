import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import * as fetchContentful from "../utils/fetch"
import { defaultLocale } from "../utils/fetch"

import Layout from "../components/layout"
import ContactFooter from "../components/contact/ContactFooter"
import ContactAddresses from "../components/contact/ContactAddresses"

const ContactContainer = styled.div`
  min-height: calc(100vh - var(--header-height));
  padding: 0 var(--padding-sides);
  margin-top: var(--header-height);
  z-index: 9;
  position: relative;
  display: flex;
  flex-direction: column;
`

const Contact = ({ location }) => {
  // State
  const { state } = location
  const initialLocale = state && state.locale ? state.locale : defaultLocale
  const [locale, setLocale] = useState(initialLocale)
  const [contactInfos, setContactInfos] = useState(null)

  useEffect(() => {
    const storageLocale = localStorage.getItem("kojotenLanguage")
    if (storageLocale && initialLocale !== storageLocale) {
      setLocale(storageLocale)
    }
  }, [])
  useEffect(() => {
    fetchContentful
      .getAllEntries(
        { content_type: "contactPage", locale: locale },
        window.location.host
      )
      .then((data) => {
        if (data.items.length > 0) {
          setContactInfos(data.items[0].fields)
        }
      })
  }, [locale])

  const changeLocale = (newLocale) => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  return (
    <Layout locale={locale} changeLocale={changeLocale}>
      <Helmet>
        <title>Kojoten | Contact</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      <ContactContainer>
        <ContactAddresses
          addresses={contactInfos?.firmensitze}
        ></ContactAddresses>
        <ContactFooter locale={locale} contactInfos={contactInfos} />
      </ContactContainer>
    </Layout>
  )
}

export default Contact
