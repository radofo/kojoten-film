import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import ContactAdress from "../components/contactAdress"
import ContactImpressum from "../components/contactImpressum"
import ContactDatenschutz from "../components/contactDatenschutz"
import ContactNavigation from "../components/contactNavigation"
import { screenSizes } from "../utils/mediaqueries"
import { defaultLocale } from "../utils/fetch"

const ContactContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 50px var(--padding-sides);
  margin-top: var(--header-height);
  z-index: 9;
  @media ${screenSizes.tablet} {
    flex-direction: row;
    padding: 150px 0 0 100px;
  }
`

const Contact = ({ location }) => {
  // Locales ===================================
  const { state } = location
  const initialLocale = state && state.locale ? state.locale : defaultLocale
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

  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = newTab => {
    setActiveTab(newTab)
  }

  return (
    <Layout locale={locale} changeLocale={changeLocale}>
      <Helmet>
        <title>Kojoten - Contact</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <ContactContainer>
        <ContactNavigation
          handleTabChange={handleTabChange}
          activeTab={activeTab}
          locale={locale}
        />
        {activeTab === 0 && <ContactAdress locale={locale} />}
        {activeTab === 1 && <ContactImpressum locale={locale} />}
        {activeTab === 2 && <ContactDatenschutz locale={locale} />}
      </ContactContainer>
    </Layout>
  )
}

export default Contact
