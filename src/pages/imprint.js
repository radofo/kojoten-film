import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"
import * as fetchContentful from "../utils/fetch"

import Layout from "../components/Layout"
import { LocaleContext } from "../context/LocaleContext"

const ImprintContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.pageSides};
  margin-top: calc(${(props) => props.theme.spacing.headerHeight} + 50px);
  z-index: 9;
  position: relative;
  color: white;

  & > :first-child {
    margin-top: 0;
  }
`

const Imprint = () => {
  const { locale } = useContext(LocaleContext)
  const [impressumContent, setImpressumContent] = useState("")

  useEffect(() => {
    fetchContentful
      .getAllEntries(
        { content_type: "impressum", locale: locale },
        window.location.host
      )
      .then((data) => {
        if (data.items.length > 0) {
          const raw = data.items[0].fields.impressum
          setImpressumContent(documentToReactComponents(raw, renderOptions))
        }
      })
  }, [locale])

  return (
    <Layout>
      <Helmet>
        <title>Kojoten | Imprint</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      <ImprintContainer>{impressumContent}</ImprintContainer>
    </Layout>
  )
}

export default Imprint
