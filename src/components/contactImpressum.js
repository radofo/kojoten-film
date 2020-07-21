import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styled from "styled-components"
import markdownStyles from "../styles/markdown.module.css"

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className={markdownStyles.markdownHeader}>{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className={markdownStyles.markdownHeader}>{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className={markdownStyles.markdownHeader}>{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className={markdownStyles.markdownHeader}>{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5 className={markdownStyles.markdownHeader}>{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className={markdownStyles.markdownHeader}>{children}</h6>
    ),
  },
}

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
      setImpressumContent(documentToReactComponents(raw, options))
    })
  }, [])
  return <MarkdownContainer>{impressumContent}</MarkdownContainer>
}

export default ContactImpressum
