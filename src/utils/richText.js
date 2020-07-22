import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import React from "react"
import markdownStyles from "../styles/markdown.module.css"

export const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: text => (
      <span className={markdownStyles.markdownHighlight}>{text}</span>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1
        className={`${markdownStyles.markdownHeader} ${markdownStyles.markdownH1}`}
      >
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2
        className={`${markdownStyles.markdownHeader} ${markdownStyles.markdownH2}`}
      >
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3
        className={`${markdownStyles.markdownHeader} ${markdownStyles.markdownH3}`}
      >
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4
        className={`${markdownStyles.markdownHeader} ${markdownStyles.markdownH4}`}
      >
        {children}
      </h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5
        className={`${markdownStyles.markdownHeader} ${markdownStyles.markdownH5}`}
      >
        {children}
      </h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6
        className={`${markdownStyles.markdownHeader} ${markdownStyles.markdownH6}`}
      >
        {children}
      </h6>
    ),
  },
}
