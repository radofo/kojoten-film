import React, { useState } from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import ContactAdress from "../components/contactAdress"
import ContactImpressum from "../components/contactImpressum"
import ContactDatenschutz from "../components/contactDatenschutz"
import ContactNavigation from "../components/contactNavigation"
import { screenSizes } from "../utils/mediaqueries"

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px var(--padding-sides);
  margin-top: var(--header-height);
  @media ${screenSizes.tablet} {
    flex-direction: row;
    padding: 150px 0 0 100px;
  }
`

const Contact = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = newTab => {
    setActiveTab(newTab)
  }

  return (
    <Layout>
      <Helmet>
        <title>Kojoten - Contact</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <ContactContainer>
        <ContactNavigation
          handleTabChange={handleTabChange}
          activeTab={activeTab}
        />
        {activeTab === 0 && <ContactAdress />}
        {activeTab === 1 && <ContactImpressum />}
        {activeTab === 2 && <ContactDatenschutz />}
      </ContactContainer>
    </Layout>
  )
}

export default Contact
