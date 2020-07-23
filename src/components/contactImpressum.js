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

const ContactImpressum = () => {
  const [impressumContent, setImpressumContent] = useState("")

  useEffect(() => {
    fetchContentful.getAllEntries("impressum").then(data => {
      const raw = data.items[0].fields.impressum
      setImpressumContent(documentToReactComponents(raw, renderOptions))
    })
  }, [])
  return <MarkdownContainer>{impressumContent}</MarkdownContainer>
}

export default ContactImpressum
