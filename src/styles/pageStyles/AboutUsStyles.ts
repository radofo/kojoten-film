import styled from "styled-components"

export const AboutUsContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const AboutUsPageContent = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.pageSides};
  z-index: 9;
  padding-top: ${(props) => props.theme.spacing.headerHeight};
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "whoHeader"
    "whoContent"
    "whereHeader"
    "whereContent";
  color: ${({ theme }) => theme.colors.normal};

  @media ${({ theme }) => theme.screenSizes.desktop} {
    padding-top: ${(props) =>
      `calc(${props.theme.spacing.headerHeight} + 100px)`};
    grid-template-areas:
      "whoHeader    whoContent"
      "whereHeader  whereContent";
    gap: 90px;
    grid-template-columns: max-content 1fr;
  }
`

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.highlight};
  font-size: ${({ theme }) => theme.fontSizes.xxxxLarge};
  margin-top: 40px;
  margin-bottom: 20px;

  @media ${({ theme }) => theme.screenSizes.desktop} {
    margin-block: 0px;
  }
`
const Content = styled.div`
  padding-top: 6px;
  text-align: justify;
`
export const WhoHeader = styled(Header)`
  grid-area: whoHeader;
`
export const WhoContent = styled(Content)`
  grid-area: whoContent;
  color: ${(props) => props.theme.colors.textDimmed};
`
export const WhoText = styled.div`
  max-width: 900px;
`

export const WhereHeader = styled(Header)`
  grid-area: whereHeader;
`
export const WhereContent = styled(Content)`
  grid-area: whereContent;
`
