import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { renderOptions } from "../utils/richText"
import styled from "styled-components"

const MarkdownContainer = styled.div`
  color: white;
  padding-right: 20px;

  & > :first-child {
    margin-top: 0;
  }
`

const ContactDatenschutz = () => {
  const [datenschutzContent, setDatenschutzContent] = useState("")

  useEffect(() => {
    fetchContentful
      .getAllEntries({ content_type: "datenschutz", locale: "en-US" })
      .then(data => {
        const raw = data.items[0].fields.datenschutzText
        setDatenschutzContent(documentToReactComponents(raw, renderOptions))
      })
  }, [])
  return <MarkdownContainer>{datenschutzContent}</MarkdownContainer>
}

export default ContactDatenschutz
