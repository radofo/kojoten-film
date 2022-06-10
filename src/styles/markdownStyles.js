import styled from "styled-components"

export const MarkdownHighlight = styled.span`
  color: ${({ theme }) => theme.colors.highlight};
`

export const MarkdownParagraph = styled.p`
  margin-bottom: 8px;
`

export const MarkdownHyperlink = styled.a`
  color: white;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`

export const MarkdownHeader = styled.h1`
  margin: 20px 0 5px;
  color: ${({ theme }) => theme.colors.normal};
`

export const MarkdownH1 = styled(MarkdownHeader)`
  font-size: calc(${({ theme }) => theme.fontSizes.regular} + 10px);
`
export const MarkdownH2 = styled(MarkdownHeader)`
  font-size: calc(${({ theme }) => theme.fontSizes.regular} + 8px);
`
export const MarkdownH3 = styled(MarkdownHeader)`
  font-size: calc(${({ theme }) => theme.fontSizes.regular} + 6px);
`
export const MarkdownH4 = styled(MarkdownHeader)`
  font-size: calc(${({ theme }) => theme.fontSizes.regular} + 4px);
`
export const MarkdownH5 = styled(MarkdownHeader)`
  font-size: calc(${({ theme }) => theme.fontSizes.regular} + 2px);
`
export const MarkdownH6 = styled(MarkdownHeader)`
  font-size: ${({ theme }) => theme.fontSizes.regular};
`
