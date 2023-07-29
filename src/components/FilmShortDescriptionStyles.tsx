import styled from "styled-components"

export const FilmDetailHeader = styled.h1<{ isColoredHeader: boolean }>`
  text-transform: uppercase;
  color: ${(props) =>
    props.isColoredHeader
      ? props.theme.colors.highlight
      : props.theme.colors.normal};
  line-height: 0.9;
  font-weight: normal;
  margin-bottom: 10px;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    font-size: 3em;
  }
`
export const FilmDetailDirector = styled.p`
  margin-bottom: 15px;
  color: ${(props) => props.theme.colors.normal};
  font-size: ${(props) => props.theme.fontSizes.regular};
`
export const FilmDetailGenres = styled.p`
  color: ${(props) => props.theme.colors.normal};

  font-size: ${(props) => props.theme.fontSizes.regular};
  text-transform: uppercase;
`
export const FilmDetailPlaytime = styled.p`
  color: ${(props) => props.theme.colors.normal};
  font-size: ${(props) => props.theme.fontSizes.regular};
`
export const FilmDetailStatus = styled.p`
  color: ${({ theme }) => theme.colors.highlight};
`
