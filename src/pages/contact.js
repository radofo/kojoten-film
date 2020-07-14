import React, { useState } from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import ContactAdress from "../components/contactAdress"
import ContactImpressum from "../components/contactImpressum"
import ContactDatenschutz from "../components/contactDatenschutz"
import ContactNavigation from "../components/contactNavigation"
import { screenSizes } from "../utils/mediaqueries"

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 75px;
  margin-top: var(--header-height);
  border: 1px solid red;
  @media ${screenSizes.tablet} {
    flex-direction: row;
    padding-top: 150px;
    padding-left: 100px;
  }
`

const Contact = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = newTab => {
    setActiveTab(newTab)
  }

  return (
    <Layout>
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
