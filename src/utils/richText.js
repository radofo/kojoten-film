import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import React from "react"
import {
  MarkdownH1,
  MarkdownH2,
  MarkdownH3,
  MarkdownH4,
  MarkdownH5,
  MarkdownH6,
  MarkdownHighlight,
  MarkdownHyperlink,
  MarkdownParagraph,
  MarkdownSpacing,
} from "../styles/markdownStyles"

export const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <MarkdownHighlight>{text}</MarkdownHighlight>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <MarkdownParagraph>{children}</MarkdownParagraph>
    ),
    [BLOCKS.HR]: (node, children) => <MarkdownSpacing />,
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <MarkdownHyperlink target="_blank" href={node.data.uri}>
          {children}
        </MarkdownHyperlink>
      )
    },
    [BLOCKS.HEADING_1]: (node, children) => <MarkdownH1>{children}</MarkdownH1>,
    [BLOCKS.HEADING_2]: (node, children) => <MarkdownH2>{children}</MarkdownH2>,
    [BLOCKS.HEADING_3]: (node, children) => <MarkdownH3>{children}</MarkdownH3>,
    [BLOCKS.HEADING_4]: (node, children) => <MarkdownH4>{children}</MarkdownH4>,
    [BLOCKS.HEADING_5]: (node, children) => <MarkdownH5>{children}</MarkdownH5>,
    [BLOCKS.HEADING_6]: (node, children) => <MarkdownH6>{children}</MarkdownH6>,
  },
}
