import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"
import styled from "styled-components"

import { screenSizes } from "../utils/mediaqueries"

const MarkdownContainer = styled.div`
  color: white;
  padding: 0 0 50px;

  & > :first-child {
    margin-top: 0;
  }
  @media ${screenSizes.tablet} {
    padding: 0 40px 50px;
  }
`

const ContactImpressum = () => {
  const [impressumContent, setImpressumContent] = useState("")

  useEffect(() => {
    fetchContentful
      .getAllEntries({ content_type: "impressum", locale: "en-US" })
      .then(data => {
        const raw = data.items[0].fields.impressum
        setImpressumContent(documentToReactComponents(raw, renderOptions))
      })
  }, [])
  return <MarkdownContainer>{impressumContent}</MarkdownContainer>
}

export default ContactImpressum
