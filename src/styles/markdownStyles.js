import styled from "styled-components"

export const MarkdownHighlight = styled.span`
  color: var(--highlight-color);
`

export const MarkdownParagraph = styled.p`
  margin-bottom: 8px;
`

export const MarkdownHyperlink = styled.a`
  color: white;

  &:hover {
    color: var(--highlight-color);
  }
`

export const MarkdownHeader = styled.h1`
  margin: 20px 0 5px;
  color: var(--text-color);
`

export const MarkdownH1 = styled(MarkdownHeader)`
  font-size: calc(var(--default-font-size) + 10px);
`
export const MarkdownH2 = styled(MarkdownHeader)`
  font-size: calc(var(--default-font-size) + 8px);
`
export const MarkdownH3 = styled(MarkdownHeader)`
  font-size: calc(var(--default-font-size) + 6px);
`
export const MarkdownH4 = styled(MarkdownHeader)`
  font-size: calc(var(--default-font-size) + 4px);
`
export const MarkdownH5 = styled(MarkdownHeader)`
  font-size: calc(var(--default-font-size) + 2px);
`
export const MarkdownH6 = styled(MarkdownHeader)`
  font-size: var(--default-font-size);
`
