import React, { useState } from "react"
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

const Contact = () => {
  const [activeTab, setActiveTab] = useState(0)

  // Locales
  const [locale, setLocale] = useState(defaultLocale)

  const handleTabChange = newTab => {
    setActiveTab(newTab)
  }

  const changeLocale = newLocale => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
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
        />
        {activeTab === 0 && <ContactAdress locale={locale} />}
        {activeTab === 1 && <ContactImpressum locale={locale} />}
        {activeTab === 2 && <ContactDatenschutz locale={locale} />}
      </ContactContainer>
    </Layout>
  )
}

export default Contact
