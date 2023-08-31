import styled from "styled-components"

export const FilmDetailInfoContainer = styled.div<{ infosOpen: boolean }>`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #363b44;
    border-radius: 10px;
  }
  display: flex;
  flex-direction: column;
  padding: 20px ${({ theme }) => theme.spacing.pageSides} 100px;
  margin: ${(props) => props.theme.spacing.headerHeight} 0 0;
  opacity: ${(props) => {
    return props.infosOpen ? "1" : "0"
  }};
  visibility: ${(props) => {
    return props.infosOpen ? "visible" : "hidden"
  }};
  z-index: ${(props) => {
    return props.infosOpen ? "99" : "0"
  }};
  transition: all 0.45s ease-out;
  transform: ${(props) => {
    return props.infosOpen ? "translateY(0)" : "translateY(50px)"
  }};
  color: white;

  @media ${({ theme }) => theme.screenSizes.desktop} {
    display: flex;
    flex-direction: row;
  }
`

export const FilmDetailSynopsis = styled.div`
  max-width: 100%;
  padding-right: 60px;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    flex-grow: 0;
    flex-basis: 50%;
    & > div:last-child {
      padding-bottom: 50px;
    }
  }
`

export const FilmDetailCredits = styled.div`
  margin: 20px 0;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    padding-left: 60px;
    margin: 0;
    padding-top: 10px;
    flex-grow: 0;
    flex-basis: 50%;
  }
  & > div:last-child {
    padding-bottom: 50px;
  }
`

export const IconRowWrapper = styled.div`
  margin: 30px 0;
`

export const IconRowHeadingStyle = styled.h4`
  font-weight: bold;
  margin-bottom: 15px;
`

export const FilmDetailedInfos = styled.div``

export const FilmDetailDescription = styled.div`
  margin-top: 20px;
`
