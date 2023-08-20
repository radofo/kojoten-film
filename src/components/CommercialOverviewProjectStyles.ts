import styled, { keyframes } from "styled-components"
import { CommercialOverviewType } from "../types/general"

const commercialMarginV = 5
const commercialMarginH = 5

const fadeOutDesktop = keyframes`
  0% { opacity: 1}
  100% { opacity: 0}
`

export const Container = styled.div<{
  commercialWidth: number
  ratio: number
  overviewType: CommercialOverviewType
}>`
  position: relative;
  aspect-ratio: ${({ ratio }) => ratio};
  width: ${({ commercialWidth }) => `${commercialWidth}%`};
  ${({ overviewType }) =>
    overviewType !== "center" ? "border-radius: 14px;" : ""};
  overflow: hidden;
  margin: ${({ overviewType }) =>
    overviewType === "center"
      ? "0"
      : overviewType === "left"
      ? `${commercialMarginV}px ${commercialMarginH}px ${commercialMarginV}px 0px`
      : `${commercialMarginV}px 0px ${commercialMarginV}px ${commercialMarginH}px`};

  &:first-child {
    margin-top: ${({ overviewType }) =>
      overviewType !== "center" ? commercialMarginH * 2 : "0"};
  }

  .fadeOnHover {
    animation-name: ${fadeOutDesktop};
    animation-timing-function: ease-out;
    animation-duration: 0.15s;
    animation-fill-mode: both;
  }
`

export const CommercialInfosContainer = styled.div<{
  overviewType: CommercialOverviewType
}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${({ overviewType }) =>
    overviewType === "center"
      ? "center"
      : overviewType === "left"
      ? "flex-end"
      : "flex-start"};
  align-items: center;
  z-index: 10;
  color: white;
`

export const CommercialInfos = styled.div`
  transform: scale(1);
`

export const KundeUndName = styled.div<{
  overviewType: CommercialOverviewType
}>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ overviewType }) =>
    overviewType === "center"
      ? "center"
      : overviewType === "left"
      ? "flex-end"
      : "flex-start"};
  @media ${({ theme }) => theme.screenSizes.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.large};
  }
`
export const Kunde = styled.p`
  text-transform: uppercase;
  text-align: center;
  padding: 0 10px;
`
export const Name = styled.p`
  padding: 0 10px;
  text-align: center;
`

export const Regisseur = styled.p<{
  overviewType: CommercialOverviewType
}>`
  padding: 0 10px;
  font-weight: 300;
  text-align: ${({ overviewType }) =>
    overviewType === "center"
      ? "center"
      : overviewType === "left"
      ? "right"
      : "left"};
`
