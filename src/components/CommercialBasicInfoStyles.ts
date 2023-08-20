import styled from "styled-components"

export const CommercialBasicInfoContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 40px;
  padding: 0 calc(${({ theme }) => theme.spacing.pageSides} + 10px);
  color: white;

  @media ${({ theme }) => theme.screenSizes.desktop} {
    bottom: 60px;
  }
`

export const CommercialDetailHeader = styled.h1`
  line-height: 0.9;
  margin-bottom: 5px;
  text-transform: uppercase;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    font-size: 3em;
  }
`
export const CommercialMoreDetails = styled.p`
  margin-bottom: 15px;
  font-size: ${(props) => props.theme.fontSizes.xxLarge};
`
