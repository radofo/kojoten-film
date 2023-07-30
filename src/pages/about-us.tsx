import React, { useState, useEffect, useContext } from "react"
import { Helmet } from "react-helmet"
import * as fetchContentful from "../utils/fetch"

import Layout from "../components/Layout"
import ContactFooter from "../components/ContactFooter"
import ContactAddresses from "../components/ContactAddresses"
import {
  AboutUsPage,
  fromContentfulResponseToAboutUsPage,
} from "../contentful/about-us"
import {
  AboutUsContainer,
  AboutUsPageContent,
  WhereContent,
  WhereHeader,
  WhoContent,
  WhoHeader,
  WhoText,
} from "../styles/pageStyles/AboutUsStyles"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"
import { LocaleContext } from "../context/LocaleContext"

const AboutUs = () => {
  const { locale } = useContext(LocaleContext)
  const [aboutUsPage, setAboutUsPage] = useState<AboutUsPage>()

  useEffect(() => {
    ;(async () => {
      const response = await fetchContentful.getAllEntriesWithAllLocales(
        "contactPage"
      )
      const mappedResponse = fromContentfulResponseToAboutUsPage(response)
      if (mappedResponse) {
        setAboutUsPage(mappedResponse)
      }
    })()
  }, [])

  const whoContent = aboutUsPage?.beschreibungContent?.[locale]

  return (
    <Layout>
      <Helmet>
        <title>Kojoten | About Us</title>
        <meta
          name="description"
          content="info@kojotenfilm.de, +49 173 7735474, Standorte in Berlin und Stuttgart."
        />
      </Helmet>
      <AboutUsContainer>
        <ContactAddresses firmensitze={aboutUsPage?.firmensitze ?? []} />
        {/* <AboutUsPageContent>
          <WhoHeader>{aboutUsPage?.beschreibungHeader?.[locale]}</WhoHeader>
          <WhereHeader>{aboutUsPage?.firmensitzeHeader?.[locale]}</WhereHeader>
          <WhoContent>
            {whoContent && (
              <WhoText>
                {documentToReactComponents(whoContent, renderOptions)}
              </WhoText>
            )}
          </WhoContent>
          <WhereContent>
            <ContactAddresses firmensitze={aboutUsPage?.firmensitze ?? []} />
          </WhereContent>
        </AboutUsPageContent> */}
        {aboutUsPage && <ContactFooter aboutUsPage={aboutUsPage} />}
      </AboutUsContainer>
    </Layout>
  )
}

export default AboutUs
